import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { LearningMaterial, type LearningMaterialDocument } from './schemas/learning-material.schema.js';
import { ClassMember, type ClassMemberDocument } from '../classes/schemas/class-member.schema.js';
import { CreateMaterialDto } from './dto/create-material.dto.js';
import { ShareMaterialDto } from './dto/share-material.dto.js';
import type { AuthenticatedUser } from '../common/types/authenticated-user.js';

@Injectable()
export class MaterialsService {
  constructor(
    @InjectModel(LearningMaterial.name) private readonly materialModel: Model<LearningMaterialDocument>,
    @InjectModel(ClassMember.name) private readonly classMemberModel: Model<ClassMemberDocument>,
  ) {}

  /** Học liệu luôn bắt đầu ở chế độ private (cá nhân); dùng share() để đưa ra lớp/hệ thống. */
  create(ownerId: string, dto: CreateMaterialDto) {
    return this.materialModel.create({ ownerId, ...dto, visibility: 'private' });
  }

  /**
   * Kho học liệu mà user hiện tại được phép khai thác: của chính mình,
   * chia sẻ theo lớp mà họ tham gia (dạy hoặc học), hoặc đã duyệt lên kho chung.
   */
  async listVisible(user: AuthenticatedUser) {
    const myClasses = await this.classMemberModel.find({ userId: user.userId, status: 'active' }).exec();
    const classIds = myClasses.map((m) => m.classId);

    return this.materialModel
      .find({
        $or: [
          { ownerId: user.userId },
          { visibility: 'system', moderationStatus: 'approved' },
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
    if (dto.visibility === 'system') {
      material.moderationStatus = 'pending_review';
    }
    return material.save();
  }

  listPendingModeration() {
    return this.materialModel.find({ moderationStatus: 'pending_review' }).sort({ createdAt: 1 }).exec();
  }

  async moderate(materialId: string, approve: boolean) {
    const material = await this.materialModel.findById(materialId).exec();
    if (!material) throw new NotFoundException('Không tìm thấy học liệu');
    material.moderationStatus = approve ? 'approved' : 'rejected';
    return material.save();
  }

  async recordDownload(materialId: string) {
    const result = await this.materialModel.updateOne({ _id: materialId }, { $inc: { downloadCount: 1 } });
    if (result.matchedCount === 0) throw new NotFoundException('Không tìm thấy học liệu');
  }
}
