import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import type { Connection } from 'mongoose';
import { Class, type ClassDocument } from './schemas/class.schema.js';
import { ClassMember, type ClassMemberDocument } from './schemas/class-member.schema.js';
import { CreateClassDto } from './dto/create-class.dto.js';
import { AddClassMemberDto } from './dto/add-class-member.dto.js';
import { UsersService } from '../users/users.service.js';
import type { AuthenticatedUser } from '../common/types/authenticated-user.js';
import { Role } from '../common/enums/role.enum.js';

@Injectable()
export class ClassesService {
  constructor(
    @InjectConnection() private readonly connection: Connection,
    @InjectModel(Class.name) private readonly classModel: Model<ClassDocument>,
    @InjectModel(ClassMember.name) private readonly classMemberModel: Model<ClassMemberDocument>,
    private readonly users: UsersService,
  ) {}

  /**
   * The creating teacher must automatically be a class-teacher of their own
   * class, otherwise every "isTeacherOfClass" check (assign homework, grade,
   * notify) would reject even the person who just created it.
   */
  async create(teacherId: string, dto: CreateClassDto) {
    const session = await this.connection.startSession();
    try {
      let created!: ClassDocument;
      await session.withTransaction(async () => {
        const [klass] = await this.classModel.create([{ teacherId, ...dto }], { session });
        await this.classMemberModel.create([{ classId: klass._id, userId: teacherId, role: 'teacher' }], { session });
        created = klass;
      });
      return created;
    } finally {
      await session.endSession();
    }
  }

  /** Teacher sees only classes they own; student sees classes they're a member of. */
  async listForUser(user: AuthenticatedUser) {
    if (user.role === Role.TEACHER) {
      return this.classModel.find({ teacherId: user.userId, status: 'active' }).exec();
    }
    const memberships = await this.classMemberModel.find({ userId: user.userId, status: 'active' }).exec();
    const classIds = memberships.map((m) => m.classId);
    return this.classModel.find({ _id: { $in: classIds }, status: 'active' }).exec();
  }

  async findByIdForUser(classId: string, user: AuthenticatedUser) {
    const klass = await this.classModel.findById(classId).exec();
    if (!klass) throw new NotFoundException('Không tìm thấy lớp học');
    const isOwner = user.role === Role.TEACHER && String(klass.teacherId) === user.userId;
    if (!isOwner) {
      const isMember = await this.classMemberModel.exists({ classId, userId: user.userId, status: 'active' });
      if (!isMember) throw new ForbiddenException('Bạn không thuộc lớp học này');
    }
    return klass;
  }

  /**
   * Collapses "add member" + "add to class" into one step: find-or-create the
   * user (temp password if new) and enroll them in this class in the same call.
   * Only the owning teacher may add to their own class.
   */
  async addMemberByEmail(classId: string, teacher: AuthenticatedUser, dto: AddClassMemberDto) {
    const klass = await this.classModel.findOne({ _id: classId, teacherId: teacher.userId }).exec();
    if (!klass) throw new NotFoundException('Không tìm thấy lớp học hoặc bạn không phụ trách lớp này');

    const session = await this.connection.startSession();
    try {
      let result!: { userId: string; email: string; role: string; tempPassword?: string };
      await session.withTransaction(async () => {
        const { user, tempPassword } = await this.users.findOrCreateWithTempPassword(dto.email, dto.fullName, dto.role as Role, session);
        await this.classMemberModel.create([{ classId, userId: user._id, role: dto.role }], { session });
        result = { userId: String(user._id), email: user.email, role: dto.role, tempPassword };
      });
      return result;
    } finally {
      await session.endSession();
    }
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
