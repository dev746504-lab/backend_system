import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Assignment, type AssignmentDocument } from './schemas/assignment.schema.js';
import { ClassMember, type ClassMemberDocument } from '../classes/schemas/class-member.schema.js';
import { Submission, type SubmissionDocument } from '../submissions/schemas/submission.schema.js';
import { CreateAssignmentDto } from './dto/create-assignment.dto.js';
import { UpdateAssignmentDto } from './dto/update-assignment.dto.js';
import type { AuthenticatedUser } from '../common/types/authenticated-user.js';
import { Role } from '../common/enums/role.enum.js';

@Injectable()
export class AssignmentsService {
  constructor(
    @InjectModel(Assignment.name) private readonly assignmentModel: Model<AssignmentDocument>,
    @InjectModel(ClassMember.name) private readonly classMemberModel: Model<ClassMemberDocument>,
    @InjectModel(Submission.name) private readonly submissionModel: Model<SubmissionDocument>,
  ) {}

  async create(classId: string, teacher: AuthenticatedUser, dto: CreateAssignmentDto) {
    const isTeacher =
      teacher.isAdmin || (await this.classMemberModel.exists({ classId, userId: teacher.userId, role: 'teacher', status: 'active' }));
    if (!isTeacher) throw new ForbiddenException('Bạn không phụ trách lớp này');

    // Ràng buộc nghiệp vụ được lặp lại ở đây (thay vì chỉ nằm trong schema pre-validate)
    // để trả về 400 rõ ràng thay vì 500 khi Mongoose validation throw lỗi thô.
    // examId là tuỳ chọn: "online" nghĩa là học sinh nộp bài làm dạng văn bản
    // qua app (khác "offline" - làm ngoài app, giáo viên chấm tay) - không bắt
    // buộc phải gắn đề thi trắc nghiệm (chưa có giao diện tạo đề thi).
    if (new Date(dto.dueDate).getTime() <= Date.now()) {
      throw new BadRequestException('Hạn nộp phải ở tương lai');
    }

    return this.assignmentModel.create({
      classId,
      teacherId: teacher.userId,
      ...dto,
      dueDate: new Date(dto.dueDate),
    });
  }

  async listForClass(classId: string, user: AuthenticatedUser) {
    const isMember = await this.classMemberModel.exists({ classId, userId: user.userId, status: 'active' });
    if (!user.isAdmin && !isMember) throw new ForbiddenException('Bạn không thuộc lớp này');

    // Học sinh không thấy bài ở trạng thái 'draft' - giáo viên/admin thấy tất cả
    // (kể cả draft) để còn publish. 'closed' vẫn hiển thị cho học sinh vì đó chỉ
    // là ngừng nhận bài nộp mới, không phải ẩn lịch sử/điểm đã có.
    const filter: Record<string, unknown> = { classId, deletedAt: null };
    if (user.role === Role.STUDENT) {
      filter.status = { $in: ['assigned', 'closed'] as const };
    }
    return this.assignmentModel.find(filter).sort({ dueDate: 1 }).exec();
  }

  async findByIdForUser(assignmentId: string, user: AuthenticatedUser) {
    const assignment = await this.assignmentModel.findOne({ _id: assignmentId, deletedAt: null }).exec();
    if (!assignment) throw new NotFoundException('Không tìm thấy bài tập');

    if (user.role === Role.STUDENT) {
      const isMember = await this.classMemberModel.exists({ classId: assignment.classId, userId: user.userId, status: 'active' });
      if (!isMember) throw new ForbiddenException('Bạn không thuộc lớp được giao bài này');
      // Coi như không tồn tại thay vì 403, để không lộ việc bài draft có tồn tại.
      if (assignment.status === 'draft') throw new NotFoundException('Không tìm thấy bài tập');
    }
    return assignment;
  }

  async publish(assignmentId: string, teacher: AuthenticatedUser) {
    const assignment = await this.findEditable(assignmentId, teacher);
    if (assignment.status !== 'draft') {
      throw new BadRequestException('Chỉ bài đang ở trạng thái nháp mới publish được');
    }
    assignment.status = 'assigned';
    return assignment.save();
  }

  async close(assignmentId: string, teacher: AuthenticatedUser) {
    const assignment = await this.findEditable(assignmentId, teacher);
    if (assignment.status !== 'assigned') {
      throw new BadRequestException('Chỉ bài đang giao mới đóng được');
    }
    assignment.status = 'closed';
    return assignment.save();
  }

  /**
   * Chung cho update()/remove(): xác thực bài tập tồn tại (chưa bị xoá mềm)
   * và người gọi là giáo viên phụ trách lớp hoặc admin.
   */
  private async findEditable(assignmentId: string, teacher: AuthenticatedUser) {
    const assignment = await this.assignmentModel.findOne({ _id: assignmentId, deletedAt: null }).exec();
    if (!assignment) throw new NotFoundException('Không tìm thấy bài tập');

    const isTeacher =
      teacher.isAdmin ||
      (await this.classMemberModel.exists({ classId: assignment.classId, userId: teacher.userId, role: 'teacher', status: 'active' }));
    if (!isTeacher) throw new ForbiddenException('Bạn không phụ trách lớp này');

    return assignment;
  }

  async update(assignmentId: string, teacher: AuthenticatedUser, dto: UpdateAssignmentDto) {
    const assignment = await this.findEditable(assignmentId, teacher);

    // Đã có bài chấm rồi thì không cho đổi các field ảnh hưởng tới cách chấm/nộp
    // (type, dueDate, maxScore, examId, tài liệu đính kèm) để tránh lệch dữ liệu
    // điểm đã chốt — chỉ còn sửa được mô tả.
    const hasGraded = await this.submissionModel.exists({ assignmentId, status: 'graded' });
    if (hasGraded) {
      const restrictedFields = ['title', 'type', 'examId', 'attachedMaterialIds', 'dueDate', 'maxScore'] as const;
      const attemptedRestricted = restrictedFields.filter((f) => dto[f] !== undefined);
      if (attemptedRestricted.length) {
        throw new BadRequestException('Bài tập đã có điểm chấm, chỉ được sửa mô tả');
      }
      if (dto.description !== undefined) assignment.description = dto.description;
      return assignment.save();
    }

    if (dto.dueDate !== undefined && new Date(dto.dueDate).getTime() <= Date.now()) {
      throw new BadRequestException('Hạn nộp phải ở tương lai');
    }

    if (dto.title !== undefined) assignment.title = dto.title;
    if (dto.description !== undefined) assignment.description = dto.description;
    if (dto.type !== undefined) assignment.type = dto.type;
    if (dto.examId !== undefined) assignment.examId = new Types.ObjectId(dto.examId);
    if (dto.attachedMaterialIds !== undefined) assignment.attachedMaterialIds = dto.attachedMaterialIds.map((id) => new Types.ObjectId(id));
    if (dto.dueDate !== undefined) assignment.dueDate = new Date(dto.dueDate);
    if (dto.maxScore !== undefined) assignment.maxScore = dto.maxScore;

    return assignment.save();
  }

  async remove(assignmentId: string, teacher: AuthenticatedUser) {
    const assignment = await this.findEditable(assignmentId, teacher);

    const hasGraded = await this.submissionModel.exists({ assignmentId, status: 'graded' });
    if (hasGraded) {
      throw new BadRequestException('Không thể xoá bài tập đã có điểm chấm');
    }

    assignment.deletedAt = new Date();
    await assignment.save();
  }
}
