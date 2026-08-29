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
let StudentProgress = class StudentProgress {
    studentId;
    classId;
    subject;
    avgScore;
    completedCount;
    totalCount;
    lastGradedAt;
};
__decorate([
    Prop({ type: Types.ObjectId, ref: 'User', required: true, index: true }),
    __metadata("design:type", Types.ObjectId)
], StudentProgress.prototype, "studentId", void 0);
__decorate([
    Prop({ type: Types.ObjectId, ref: 'Class', required: true, index: true }),
    __metadata("design:type", Types.ObjectId)
], StudentProgress.prototype, "classId", void 0);
__decorate([
    Prop({ trim: true }),
    __metadata("design:type", String)
], StudentProgress.prototype, "subject", void 0);
__decorate([
    Prop({ default: 0 }),
    __metadata("design:type", Number)
], StudentProgress.prototype, "avgScore", void 0);
__decorate([
    Prop({ default: 0 }),
    __metadata("design:type", Number)
], StudentProgress.prototype, "completedCount", void 0);
__decorate([
    Prop({ default: 0 }),
    __metadata("design:type", Number)
], StudentProgress.prototype, "totalCount", void 0);
__decorate([
    Prop(),
    __metadata("design:type", Date)
], StudentProgress.prototype, "lastGradedAt", void 0);
StudentProgress = __decorate([
    Schema({ timestamps: true })
], StudentProgress);
export { StudentProgress };
export const StudentProgressSchema = SchemaFactory.createForClass(StudentProgress);
StudentProgressSchema.index({ studentId: 1, classId: 1, subject: 1 }, { unique: true });
//# sourceMappingURL=student-progress.schema.js.map