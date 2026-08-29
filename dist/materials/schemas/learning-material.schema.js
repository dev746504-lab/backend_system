var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
let LearningMaterial = class LearningMaterial {
    institutionId;
    ownerId;
    title;
    type;
    visibility;
    sharedWithClassIds;
    subject;
    gradeLevel;
    tags;
    fileUrl;
    fileSize;
    mimeType;
    moderationStatus;
    downloadCount;
};
__decorate([
    Prop({ type: Types.ObjectId, ref: 'Institution', required: true, index: true }),
    __metadata("design:type", Types.ObjectId)
], LearningMaterial.prototype, "institutionId", void 0);
__decorate([
    Prop({ type: Types.ObjectId, ref: 'User', required: true, index: true }),
    __metadata("design:type", Types.ObjectId)
], LearningMaterial.prototype, "ownerId", void 0);
__decorate([
    Prop({ required: true, trim: true, maxlength: 200 }),
    __metadata("design:type", String)
], LearningMaterial.prototype, "title", void 0);
__decorate([
    Prop({ enum: ['video', 'document', 'image', 'audio', 'interactive'], required: true }),
    __metadata("design:type", String)
], LearningMaterial.prototype, "type", void 0);
__decorate([
    Prop({ enum: ['private', 'class', 'institution'], default: 'private' }),
    __metadata("design:type", String)
], LearningMaterial.prototype, "visibility", void 0);
__decorate([
    Prop({ type: [Types.ObjectId], ref: 'Class', default: [] }),
    __metadata("design:type", Array)
], LearningMaterial.prototype, "sharedWithClassIds", void 0);
__decorate([
    Prop({ trim: true }),
    __metadata("design:type", String)
], LearningMaterial.prototype, "subject", void 0);
__decorate([
    Prop({ trim: true }),
    __metadata("design:type", String)
], LearningMaterial.prototype, "gradeLevel", void 0);
__decorate([
    Prop({ type: [String], default: [] }),
    __metadata("design:type", Array)
], LearningMaterial.prototype, "tags", void 0);
__decorate([
    Prop({ required: true }),
    __metadata("design:type", String)
], LearningMaterial.prototype, "fileUrl", void 0);
__decorate([
    Prop(),
    __metadata("design:type", Number)
], LearningMaterial.prototype, "fileSize", void 0);
__decorate([
    Prop(),
    __metadata("design:type", String)
], LearningMaterial.prototype, "mimeType", void 0);
__decorate([
    Prop({ enum: ['pending_review', 'approved', 'rejected'], default: 'approved' }),
    __metadata("design:type", String)
], LearningMaterial.prototype, "moderationStatus", void 0);
__decorate([
    Prop({ default: 0 }),
    __metadata("design:type", Number)
], LearningMaterial.prototype, "downloadCount", void 0);
LearningMaterial = __decorate([
    Schema({ timestamps: true })
], LearningMaterial);
export { LearningMaterial };
export const LearningMaterialSchema = SchemaFactory.createForClass(LearningMaterial);
LearningMaterialSchema.index({ institutionId: 1, subject: 1, gradeLevel: 1 });
LearningMaterialSchema.index({ title: 'text', tags: 'text' });
//# sourceMappingURL=learning-material.schema.js.map