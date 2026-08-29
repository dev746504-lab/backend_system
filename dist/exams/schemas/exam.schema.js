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
let ExamQuestionRef = class ExamQuestionRef {
    questionId;
    weight;
};
__decorate([
    Prop({ type: Types.ObjectId, ref: 'Question', required: true }),
    __metadata("design:type", Types.ObjectId)
], ExamQuestionRef.prototype, "questionId", void 0);
__decorate([
    Prop({ required: true, min: 0 }),
    __metadata("design:type", Number)
], ExamQuestionRef.prototype, "weight", void 0);
ExamQuestionRef = __decorate([
    Schema({ _id: false })
], ExamQuestionRef);
export { ExamQuestionRef };
export const ExamQuestionRefSchema = SchemaFactory.createForClass(ExamQuestionRef);
let Exam = class Exam {
    institutionId;
    createdBy;
    title;
    type;
    questionRefs;
    totalScore;
    durationMin;
    status;
};
__decorate([
    Prop({ type: Types.ObjectId, ref: 'Institution', required: true, index: true }),
    __metadata("design:type", Types.ObjectId)
], Exam.prototype, "institutionId", void 0);
__decorate([
    Prop({ type: Types.ObjectId, ref: 'User', required: true }),
    __metadata("design:type", Types.ObjectId)
], Exam.prototype, "createdBy", void 0);
__decorate([
    Prop({ required: true, trim: true, maxlength: 200 }),
    __metadata("design:type", String)
], Exam.prototype, "title", void 0);
__decorate([
    Prop({ enum: ['exam', 'quiz', 'worksheet'], required: true }),
    __metadata("design:type", String)
], Exam.prototype, "type", void 0);
__decorate([
    Prop({ type: [ExamQuestionRefSchema], default: [] }),
    __metadata("design:type", Array)
], Exam.prototype, "questionRefs", void 0);
__decorate([
    Prop({ required: true, min: 0 }),
    __metadata("design:type", Number)
], Exam.prototype, "totalScore", void 0);
__decorate([
    Prop({ min: 1 }),
    __metadata("design:type", Number)
], Exam.prototype, "durationMin", void 0);
__decorate([
    Prop({ enum: ['draft', 'published'], default: 'draft' }),
    __metadata("design:type", String)
], Exam.prototype, "status", void 0);
Exam = __decorate([
    Schema({ timestamps: true })
], Exam);
export { Exam };
export const ExamSchema = SchemaFactory.createForClass(Exam);
ExamSchema.pre('validate', function () {
    const sumWeight = this.questionRefs.reduce((acc, q) => acc + q.weight, 0);
    if (this.questionRefs.length > 0 && Math.abs(sumWeight - this.totalScore) > 0.001) {
        throw new Error(`Tổng trọng số câu hỏi (${sumWeight}) phải bằng totalScore (${this.totalScore})`);
    }
});
//# sourceMappingURL=exam.schema.js.map