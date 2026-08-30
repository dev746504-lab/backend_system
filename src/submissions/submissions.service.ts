import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import type { Connection } from 'mongoose';
import { Submission, type SubmissionDocument } from './schemas/submission.schema.js';
import { Assignment, type AssignmentDocument } from '../assignments/schemas/assignment.schema.js';
import { ClassMember, type ClassMemberDocument } from '../classes/schemas/class-member.schema.js';
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
    @InjectModel(ClassMember.name) private readonly classMemberModel: Model<ClassMemberDocument>,
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

  /**
   * Trả về toàn bộ danh sách học sinh trong lớp (không chỉ những ai đã có
   * bản ghi Submission) — bài offline không bao giờ tạo Submission qua nộp
   * bài online, nên chỉ liệt kê theo Submission sẽ luôn trống với loại này.
   */
  async listForAssignment(assignmentId: string) {
    const assignment = await this.assignmentModel.findById(assignmentId).exec();
    if (!assignment) throw new NotFoundException('Không tìm thấy bài tập');

    const [members, submissions] = await Promise.all([
      this.classMemberModel
        .find({ classId: assignment.classId, role: 'student', status: 'active' })
        .populate('userId', 'fullName email')
        .exec(),
      this.submissionModel.find({ assignmentId }).exec(),
    ]);

    const byStudentId = new Map(submissions.map((s) => [String(s.studentId), s]));
    return members.map((member) => {
      const existing = byStudentId.get(String(member.userId._id ?? member.userId));
      if (existing) return { ...existing.toObject(), studentId: member.userId };
      return {
        _id: null,
        assignmentId,
        studentId: member.userId,
        maxScoreSnapshot: assignment.maxScore,
        status: 'not_submitted' as const,
      };
    });
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

  /**
   * Chấm điểm trực tiếp cho một học sinh trong lớp mà không cần bản ghi
   * Submission có sẵn — cần cho bài "Offline (chấm tay)", vốn không bao giờ
   * có nộp bài qua app (submit() chỉ dành cho học sinh, bài giấy/ngoài app).
   * Upsert giống submit(): tạo mới nếu học sinh chưa từng có bản ghi.
   */
  async gradeDirect(assignmentId: string, studentId: string, grader: AuthenticatedUser, dto: GradeSubmissionDto) {
    const session = await this.connection.startSession();
    try {
      let updated!: SubmissionDocument;
      await session.withTransaction(async () => {
        const assignment = await this.assignmentModel.findOne({ _id: assignmentId, institutionId: grader.institutionId }).session(session);
        if (!assignment) throw new NotFoundException('Không tìm thấy bài tập');
        if (String(assignment.teacherId) !== grader.userId) {
          throw new ForbiddenException('Chỉ giáo viên phụ trách mới được chấm bài này');
        }

        const isMember = await this.classMemberModel
          .exists({ classId: assignment.classId, userId: studentId, role: 'student', status: 'active' })
          .session(session);
        if (!isMember) throw new NotFoundException('Học sinh không thuộc lớp này');

        const result = await this.submissionModel.findOneAndUpdate(
          { assignmentId, studentId },
          {
            $set: {
              score: dto.score,
              feedback: dto.feedback,
              gradedBy: new Types.ObjectId(grader.userId),
              gradedAt: new Date(),
              status: 'graded',
            },
            $setOnInsert: { maxScoreSnapshot: assignment.maxScore },
          },
          { upsert: true, new: true, runValidators: true, session },
        );
        updated = result!;

        await this.reports.recompute(studentId, String(assignment.classId), session);
      });
      return updated;
    } finally {
      await session.endSession();
    }
  }
}
