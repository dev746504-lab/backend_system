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
let Question = class Question {
    institutionId;
    ownerId;
    subject;
    topic;
    type;
    content;
    options;
    correctAnswer;
    difficulty;
    tags;
    sourceMaterialId;
};
__decorate([
    Prop({ type: Types.ObjectId, ref: 'Institution', required: true, index: true }),
    __metadata("design:type", Types.ObjectId)
], Question.prototype, "institutionId", void 0);
__decorate([
    Prop({ type: Types.ObjectId, ref: 'User', required: true }),
    __metadata("design:type", Types.ObjectId)
], Question.prototype, "ownerId", void 0);
__decorate([
    Prop({ trim: true }),
    __metadata("design:type", String)
], Question.prototype, "subject", void 0);
__decorate([
    Prop({ trim: true }),
    __metadata("design:type", String)
], Question.prototype, "topic", void 0);
__decorate([
    Prop({ enum: ['multiple_choice', 'true_false', 'fill_blank', 'essay'], required: true }),
    __metadata("design:type", String)
], Question.prototype, "type", void 0);
__decorate([
    Prop({ required: true, trim: true }),
    __metadata("design:type", String)
], Question.prototype, "content", void 0);
__decorate([
    Prop({ type: [String], default: [] }),
    __metadata("design:type", Array)
], Question.prototype, "options", void 0);
__decorate([
    Prop(),
    __metadata("design:type", String)
], Question.prototype, "correctAnswer", void 0);
__decorate([
    Prop({ enum: ['easy', 'medium', 'hard'], default: 'medium' }),
    __metadata("design:type", String)
], Question.prototype, "difficulty", void 0);
__decorate([
    Prop({ type: [String], default: [] }),
    __metadata("design:type", Array)
], Question.prototype, "tags", void 0);
__decorate([
    Prop({ type: Types.ObjectId, ref: 'LearningMaterial' }),
    __metadata("design:type", Types.ObjectId)
], Question.prototype, "sourceMaterialId", void 0);
Question = __decorate([
    Schema({ timestamps: true })
], Question);
export { Question };
export const QuestionSchema = SchemaFactory.createForClass(Question);
QuestionSchema.index({ institutionId: 1, subject: 1, topic: 1 });
//# sourceMappingURL=question.schema.js.map