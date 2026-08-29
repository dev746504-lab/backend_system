import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { LearningMaterial, type LearningMaterialDocument } from './schemas/learning-material.schema.js';
import { ClassMember, type ClassMemberDocument } from '../classes/schemas/class-member.schema.js';
import { CreateMaterialDto } from './dto/create-material.dto.js';
import { ShareMaterialDto } from './dto/share-material.dto.js';
import type { AuthenticatedUser } from '../common/types/authenticated-user.js';
import { Role } from '../common/enums/role.enum.js';

@Injectable()
export class MaterialsService {
  constructor(
    @InjectModel(LearningMaterial.name) private readonly materialModel: Model<LearningMaterialDocument>,
    @InjectModel(ClassMember.name) private readonly classMemberModel: Model<ClassMemberDocument>,
  ) {}

  /** Học liệu luôn bắt đầu ở chế độ private (cá nhân); dùng share() để đưa ra lớp/CSGD. */
  create(institutionId: string, ownerId: string, dto: CreateMaterialDto) {
    return this.materialModel.create({ institutionId, ownerId, ...dto, visibility: 'private' });
  }

  /** Kho học liệu mà user hiện tại được phép khai thác/truy cập. */
  async listVisible(institutionId: string, user: AuthenticatedUser) {
    if (user.role === Role.INSTITUTION_ADMIN) {
      return this.materialModel.find({ institutionId }).sort({ createdAt: -1 }).exec();
    }

    const myClasses = await this.classMemberModel.find({ userId: user.userId, status: 'active' }).exec();
    const classIds = myClasses.map((m) => m.classId);

    return this.materialModel
      .find({
        institutionId,
        $or: [
          { ownerId: user.userId },
          { visibility: 'institution', moderationStatus: 'approved' },
          { visibility: 'class', sharedWithClassIds: { $in: classIds } },
        ],
      })
      .sort({ createdAt: -1 })
      .exec();
  }

  async share(materialId: string, owner: AuthenticatedUser, dto: ShareMaterialDto) {
    const material = await this.materialModel.findOne({ _id: materialId, ownerId: owner.userId }).exec();
    if (!material) throw new NotFoundException('Không tìm thấy học liệu hoặc bạn không phải chủ sở hữu');

    material.visibility = dto.visibility;
    if (dto.visibility === 'class') {
      material.sharedWithClassIds = (dto.classIds ?? []).map((id) => new Types.ObjectId(id));
    }
    if (dto.visibility === 'institution') {
      material.moderationStatus = 'pending_review';
    }
    return material.save();
  }

  async moderate(materialId: string, institutionId: string, approve: boolean) {
    const material = await this.materialModel.findOne({ _id: materialId, institutionId }).exec();
    if (!material) throw new NotFoundException('Không tìm thấy học liệu');
    material.moderationStatus = approve ? 'approved' : 'rejected';
    return material.save();
  }

  async recordDownload(materialId: string, institutionId: string) {
    const result = await this.materialModel.updateOne(
      { _id: materialId, institutionId },
      { $inc: { downloadCount: 1 } },
    );
    if (result.matchedCount === 0) throw new NotFoundException('Không tìm thấy học liệu');
  }
}
