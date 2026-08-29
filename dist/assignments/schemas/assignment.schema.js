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
let Assignment = class Assignment {
    institutionId;
    classId;
    teacherId;
    title;
    description;
    type;
    examId;
    attachedMaterialIds;
    dueDate;
    maxScore;
    status;
};
__decorate([
    Prop({ type: Types.ObjectId, ref: 'Institution', required: true, index: true }),
    __metadata("design:type", Types.ObjectId)
], Assignment.prototype, "institutionId", void 0);
__decorate([
    Prop({ type: Types.ObjectId, ref: 'Class', required: true, index: true }),
    __metadata("design:type", Types.ObjectId)
], Assignment.prototype, "classId", void 0);
__decorate([
    Prop({ type: Types.ObjectId, ref: 'User', required: true }),
    __metadata("design:type", Types.ObjectId)
], Assignment.prototype, "teacherId", void 0);
__decorate([
    Prop({ required: true, trim: true, maxlength: 200 }),
    __metadata("design:type", String)
], Assignment.prototype, "title", void 0);
__decorate([
    Prop({ trim: true }),
    __metadata("design:type", String)
], Assignment.prototype, "description", void 0);
__decorate([
    Prop({ enum: ['online', 'offline'], required: true }),
    __metadata("design:type", String)
], Assignment.prototype, "type", void 0);
__decorate([
    Prop({ type: Types.ObjectId, ref: 'Exam' }),
    __metadata("design:type", Types.ObjectId)
], Assignment.prototype, "examId", void 0);
__decorate([
    Prop({ type: [Types.ObjectId], ref: 'LearningMaterial', default: [] }),
    __metadata("design:type", Array)
], Assignment.prototype, "attachedMaterialIds", void 0);
__decorate([
    Prop({ required: true }),
    __metadata("design:type", Date)
], Assignment.prototype, "dueDate", void 0);
__decorate([
    Prop({ required: true, min: 0 }),
    __metadata("design:type", Number)
], Assignment.prototype, "maxScore", void 0);
__decorate([
    Prop({ enum: ['draft', 'assigned', 'closed'], default: 'assigned' }),
    __metadata("design:type", String)
], Assignment.prototype, "status", void 0);
Assignment = __decorate([
    Schema({ timestamps: true })
], Assignment);
export { Assignment };
export const AssignmentSchema = SchemaFactory.createForClass(Assignment);
AssignmentSchema.index({ classId: 1, dueDate: 1 });
AssignmentSchema.pre('validate', function () {
    if (this.isNew && this.dueDate.getTime() <= Date.now()) {
        throw new Error('dueDate phải ở tương lai');
    }
    if (this.type === 'online' && !this.examId) {
        throw new Error('Bài tập online phải gắn một examId');
    }
});
//# sourceMappingURL=assignment.schema.js.map