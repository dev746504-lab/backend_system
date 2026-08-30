import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Assignment, type AssignmentDocument } from './schemas/assignment.schema.js';
import { ClassMember, type ClassMemberDocument } from '../classes/schemas/class-member.schema.js';
import { CreateAssignmentDto } from './dto/create-assignment.dto.js';
import type { AuthenticatedUser } from '../common/types/authenticated-user.js';
import { Role } from '../common/enums/role.enum.js';

@Injectable()
export class AssignmentsService {
  constructor(
    @InjectModel(Assignment.name) private readonly assignmentModel: Model<AssignmentDocument>,
    @InjectModel(ClassMember.name) private readonly classMemberModel: Model<ClassMemberDocument>,
  ) {}

  async create(classId: string, teacher: AuthenticatedUser, dto: CreateAssignmentDto) {
    const isTeacher = await this.classMemberModel.exists({ classId, userId: teacher.userId, role: 'teacher', status: 'active' });
    if (!isTeacher) throw new ForbiddenException('Bạn không phụ trách lớp này');

    // Ràng buộc nghiệp vụ được lặp lại ở đây (thay vì chỉ nằm trong schema pre-validate)
    // để trả về 400 rõ ràng thay vì 500 khi Mongoose validation throw lỗi thô.
    if (dto.type === 'online' && !dto.examId) {
      throw new BadRequestException('Bài tập online phải gắn một đề thi (examId)');
    }
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

  listForClass(classId: string) {
    return this.assignmentModel.find({ classId }).sort({ dueDate: 1 }).exec();
  }

  async findByIdForUser(assignmentId: string, user: AuthenticatedUser) {
    const assignment = await this.assignmentModel.findById(assignmentId).exec();
    if (!assignment) throw new NotFoundException('Không tìm thấy bài tập');

    if (user.role === Role.STUDENT) {
      const isMember = await this.classMemberModel.exists({ classId: assignment.classId, userId: user.userId, status: 'active' });
      if (!isMember) throw new ForbiddenException('Bạn không thuộc lớp được giao bài này');
    }
    return assignment;
  }
}
