import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Class, type ClassDocument } from '../classes/schemas/class.schema.js';
import { UsersService } from '../users/users.service.js';
import { MaterialsService } from '../materials/materials.service.js';
import { CreateTeacherDto } from './dto/create-teacher.dto.js';
import { Role } from '../common/enums/role.enum.js';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Class.name) private readonly classModel: Model<ClassDocument>,
    private readonly users: UsersService,
    private readonly materials: MaterialsService,
  ) {}

  async createTeacher(dto: CreateTeacherDto) {
    const { user, tempPassword } = await this.users.findOrCreateWithTempPassword(dto.email, dto.fullName, Role.TEACHER);
    return { userId: String(user._id), email: user.email, role: Role.TEACHER, tempPassword };
  }

  listTeachers() {
    return this.users.find({ role: Role.TEACHER });
  }

  listAllClasses() {
    return this.classModel.find({ status: 'active' }).populate('teacherId', 'fullName email').sort({ createdAt: -1 }).exec();
  }

  listPendingMaterials() {
    return this.materials.listPendingModeration();
  }

  moderateMaterial(materialId: string, approve: boolean) {
    return this.materials.moderate(materialId, approve);
  }
}
