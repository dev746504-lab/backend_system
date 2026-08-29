import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, type ClientSession } from 'mongoose';
import { StudentProgress, type StudentProgressDocument } from './schemas/student-progress.schema.js';
import { Submission, type SubmissionDocument } from '../submissions/schemas/submission.schema.js';
import { Assignment, type AssignmentDocument } from '../assignments/schemas/assignment.schema.js';
import { Class, type ClassDocument } from '../classes/schemas/class.schema.js';

@Injectable()
export class ReportsService {
  constructor(
    @InjectModel(StudentProgress.name) private readonly progressModel: Model<StudentProgressDocument>,
    @InjectModel(Submission.name) private readonly submissionModel: Model<SubmissionDocument>,
    @InjectModel(Assignment.name) private readonly assignmentModel: Model<AssignmentDocument>,
    @InjectModel(Class.name) private readonly classModel: Model<ClassDocument>,
  ) {}

  /**
   * Tính lại rollup tiến độ của một học sinh trong một lớp ngay sau khi
   * một bài nộp được chấm — chạy trong cùng transaction với thao tác chấm bài
   * để student_progress không bao giờ lệch khỏi dữ liệu submissions gốc.
   */
  async recompute(studentId: string, classId: string, session: ClientSession) {
    const klass = await this.classModel.findById(classId, { subject: 1 }).session(session).exec();
    const assignmentIds = await this.assignmentModel.find({ classId }, { _id: 1 }).session(session).exec();
    const ids = assignmentIds.map((a) => a._id);

    const submissions = await this.submissionModel
      .find({ assignmentId: { $in: ids }, studentId })
      .session(session)
      .exec();

    const graded = submissions.filter((s) => s.status === 'graded' && s.score != null);
    const avgScore = graded.length ? graded.reduce((sum, s) => sum + (s.score ?? 0), 0) / graded.length : 0;
    const lastGraded = graded.reduce<Date | undefined>(
      (latest, s) => (s.gradedAt && (!latest || s.gradedAt > latest) ? s.gradedAt : latest),
      undefined,
    );

    await this.progressModel.updateOne(
      { studentId, classId, subject: klass?.subject ?? null },
      {
        avgScore,
        completedCount: graded.length,
        totalCount: ids.length,
        lastGradedAt: lastGraded,
      },
      { upsert: true, session },
    );
  }

  forStudent(studentId: string, classId?: string) {
    return this.progressModel.find({ studentId, ...(classId && { classId }) }).exec();
  }

  forClass(classId: string) {
    return this.progressModel.find({ classId }).populate('studentId', 'fullName email').exec();
  }
}
