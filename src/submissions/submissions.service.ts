import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import type { Connection } from 'mongoose';
import { Submission, type SubmissionDocument } from './schemas/submission.schema.js';
import { Assignment, type AssignmentDocument } from '../assignments/schemas/assignment.schema.js';
import { SubmitAssignmentDto } from './dto/submit-assignment.dto.js';
import { GradeSubmissionDto } from './dto/grade-submission.dto.js';
import { ReportsService } from '../reports/reports.service.js';
import type { AuthenticatedUser } from '../common/types/authenticated-user.js';

@Injectable()
export class SubmissionsService {
  constructor(
    @InjectConnection() private readonly connection: Connection,
    @InjectModel(Submission.name) private readonly submissionModel: Model<SubmissionDocument>,
    @InjectModel(Assignment.name) private readonly assignmentModel: Model<AssignmentDocument>,
    private readonly reports: ReportsService,
  ) {}

  /** Upsert theo (assignmentId, studentId) — nộp lại chỉ ghi đè, không tạo bản ghi trùng. */
  async submit(assignmentId: string, student: AuthenticatedUser, dto: SubmitAssignmentDto) {
    const assignment = await this.assignmentModel.findOne({ _id: assignmentId, institutionId: student.institutionId }).exec();
    if (!assignment) throw new NotFoundException('Không tìm thấy bài tập');

    const isLate = Date.now() > assignment.dueDate.getTime();
    return this.submissionModel.findOneAndUpdate(
      { assignmentId, studentId: student.userId },
      {
        $set: {
          textContent: dto.textContent,
          fileUrls: dto.fileUrls ?? [],
          submittedAt: new Date(),
          status: isLate ? 'late' : 'submitted',
        },
        $setOnInsert: { maxScoreSnapshot: assignment.maxScore },
      },
      { upsert: true, new: true, runValidators: true },
    );
  }

  findMine(assignmentId: string, studentId: string) {
    return this.submissionModel.findOne({ assignmentId, studentId }).exec();
  }

  listForAssignment(assignmentId: string) {
    return this.submissionModel.find({ assignmentId }).populate('studentId', 'fullName email').exec();
  }

  /**
   * Chấm bài trong một transaction: cập nhật submission + tính lại
   * student_progress cùng lúc, để báo cáo không bao giờ lệch dữ liệu gốc.
   */
  async grade(submissionId: string, grader: AuthenticatedUser, dto: GradeSubmissionDto) {
    const session = await this.connection.startSession();
    try {
      let updated!: SubmissionDocument;
      await session.withTransaction(async () => {
        const submission = await this.submissionModel.findById(submissionId).session(session);
        if (!submission) throw new NotFoundException('Không tìm thấy bài nộp');

        const assignment = await this.assignmentModel.findOne({ _id: submission.assignmentId, institutionId: grader.institutionId }).session(session);
        if (!assignment) throw new ForbiddenException('Bài nộp không thuộc cơ sở giáo dục của bạn');
        if (String(assignment.teacherId) !== grader.userId) {
          throw new ForbiddenException('Chỉ giáo viên phụ trách mới được chấm bài này');
        }

        submission.score = dto.score;
        submission.feedback = dto.feedback;
        submission.gradedBy = new Types.ObjectId(grader.userId);
        submission.gradedAt = new Date();
        submission.status = 'graded';
        await submission.save({ session });

        await this.reports.recompute(String(submission.studentId), String(assignment.classId), session);
        updated = submission;
      });
      return updated;
    } finally {
      await session.endSession();
    }
  }
}
