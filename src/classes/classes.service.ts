import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Class, type ClassDocument } from './schemas/class.schema.js';
import { ClassMember, type ClassMemberDocument } from './schemas/class-member.schema.js';
import { CreateClassDto } from './dto/create-class.dto.js';
import { AddClassMemberDto } from './dto/add-class-member.dto.js';
import type { AuthenticatedUser } from '../common/types/authenticated-user.js';
import { Role } from '../common/enums/role.enum.js';

@Injectable()
export class ClassesService {
  constructor(
    @InjectModel(Class.name) private readonly classModel: Model<ClassDocument>,
    @InjectModel(ClassMember.name) private readonly classMemberModel: Model<ClassMemberDocument>,
  ) {}

  create(institutionId: string, dto: CreateClassDto) {
    return this.classModel.create({ institutionId, ...dto });
  }

  /** Admin sees every class in the institution; teacher/student see only classes they belong to. */
  async listForUser(institutionId: string, user: AuthenticatedUser) {
    if (user.role === Role.INSTITUTION_ADMIN) {
      return this.classModel.find({ institutionId, status: 'active' }).exec();
    }
    const memberships = await this.classMemberModel.find({ userId: user.userId, status: 'active' }).exec();
    const classIds = memberships.map((m) => m.classId);
    return this.classModel.find({ _id: { $in: classIds }, institutionId, status: 'active' }).exec();
  }

  async findByIdForUser(classId: string, user: AuthenticatedUser) {
    const klass = await this.classModel.findOne({ _id: classId, institutionId: user.institutionId }).exec();
    if (!klass) throw new NotFoundException('Không tìm thấy lớp học');
    if (user.role !== Role.INSTITUTION_ADMIN) {
      const isMember = await this.classMemberModel.exists({ classId, userId: user.userId, status: 'active' });
      if (!isMember) throw new ForbiddenException('Bạn không thuộc lớp học này');
    }
    return klass;
  }

  async addMember(classId: string, institutionId: string, dto: AddClassMemberDto) {
    const klass = await this.classModel.findOne({ _id: classId, institutionId }).exec();
    if (!klass) throw new NotFoundException('Không tìm thấy lớp học');
    return this.classMemberModel.create({ classId, userId: dto.userId, role: dto.role });
  }

  listMembers(classId: string) {
    return this.classMemberModel.find({ classId, status: 'active' }).populate('userId', 'fullName email').exec();
  }

  isTeacherOfClass(classId: string, userId: string) {
    return this.classMemberModel.exists({ classId, userId, role: 'teacher', status: 'active' });
  }

  isStudentOfClass(classId: string, userId: string) {
    return this.classMemberModel.exists({ classId, userId, role: 'student', status: 'active' });
  }
}
