import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import type { Connection } from 'mongoose';
import { Class, type ClassDocument } from './schemas/class.schema.js';
import { ClassMember, type ClassMemberDocument } from './schemas/class-member.schema.js';
import { CreateClassDto } from './dto/create-class.dto.js';
import { AddClassMemberDto } from './dto/add-class-member.dto.js';
import type { AuthenticatedUser } from '../common/types/authenticated-user.js';
import { Role } from '../common/enums/role.enum.js';

@Injectable()
export class ClassesService {
  constructor(
    @InjectConnection() private readonly connection: Connection,
    @InjectModel(Class.name) private readonly classModel: Model<ClassDocument>,
    @InjectModel(ClassMember.name) private readonly classMemberModel: Model<ClassMemberDocument>,
  ) {}

  /**
   * Giáo viên tạo lớp phải tự động là class-teacher của lớp đó, nếu không
   * mọi thao tác cần "isTeacherOfClass" (giao bài, chấm bài...) sẽ chặn
   * ngay cả người vừa tạo ra lớp.
   */
  async create(institutionId: string, teacherId: string, dto: CreateClassDto) {
    const session = await this.connection.startSession();
    try {
      let created!: ClassDocument;
      await session.withTransaction(async () => {
        const [klass] = await this.classModel.create([{ institutionId, ...dto }], { session });
        await this.classMemberModel.create([{ classId: klass._id, userId: teacherId, role: 'teacher' }], { session });
        created = klass;
      });
      return created;
    } finally {
      await session.endSession();
    }
  }

  /** Teacher (vai trò cao nhất trong CSGD) thấy mọi lớp; học sinh chỉ thấy lớp mình tham gia. */
  async listForUser(institutionId: string, user: AuthenticatedUser) {
    if (user.role === Role.TEACHER) {
      return this.classModel.find({ institutionId, status: 'active' }).exec();
    }
    const memberships = await this.classMemberModel.find({ userId: user.userId, status: 'active' }).exec();
    const classIds = memberships.map((m) => m.classId);
    return this.classModel.find({ _id: { $in: classIds }, institutionId, status: 'active' }).exec();
  }

  async findByIdForUser(classId: string, user: AuthenticatedUser) {
    const klass = await this.classModel.findOne({ _id: classId, institutionId: user.institutionId }).exec();
    if (!klass) throw new NotFoundException('Không tìm thấy lớp học');
    if (user.role !== Role.TEACHER) {
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
