var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { LearningMaterial } from './schemas/learning-material.schema.js';
import { ClassMember } from '../classes/schemas/class-member.schema.js';
import { Role } from '../common/enums/role.enum.js';
let MaterialsService = class MaterialsService {
    materialModel;
    classMemberModel;
    constructor(materialModel, classMemberModel) {
        this.materialModel = materialModel;
        this.classMemberModel = classMemberModel;
    }
    create(institutionId, ownerId, dto) {
        return this.materialModel.create({ institutionId, ownerId, ...dto, visibility: 'private' });
    }
    async listVisible(institutionId, user) {
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
    async share(materialId, owner, dto) {
        const material = await this.materialModel.findOne({ _id: materialId, ownerId: owner.userId }).exec();
        if (!material)
            throw new NotFoundException('Không tìm thấy học liệu hoặc bạn không phải chủ sở hữu');
        material.visibility = dto.visibility;
        if (dto.visibility === 'class') {
            material.sharedWithClassIds = (dto.classIds ?? []).map((id) => new Types.ObjectId(id));
        }
        if (dto.visibility === 'institution') {
            material.moderationStatus = 'pending_review';
        }
        return material.save();
    }
    async moderate(materialId, institutionId, approve) {
        const material = await this.materialModel.findOne({ _id: materialId, institutionId }).exec();
        if (!material)
            throw new NotFoundException('Không tìm thấy học liệu');
        material.moderationStatus = approve ? 'approved' : 'rejected';
        return material.save();
    }
    async recordDownload(materialId, institutionId) {
        const result = await this.materialModel.updateOne({ _id: materialId, institutionId }, { $inc: { downloadCount: 1 } });
        if (result.matchedCount === 0)
            throw new NotFoundException('Không tìm thấy học liệu');
    }
};
MaterialsService = __decorate([
    Injectable(),
    __param(0, InjectModel(LearningMaterial.name)),
    __param(1, InjectModel(ClassMember.name)),
    __metadata("design:paramtypes", [Model,
        Model])
], MaterialsService);
export { MaterialsService };
//# sourceMappingURL=materials.service.js.map