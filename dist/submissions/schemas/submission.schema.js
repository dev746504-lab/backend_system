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
let Submission = class Submission {
    assignmentId;
    studentId;
    maxScoreSnapshot;
    textContent;
    fileUrls;
    submittedAt;
    score;
    feedback;
    gradedBy;
    gradedAt;
    status;
};
__decorate([
    Prop({ type: Types.ObjectId, ref: 'Assignment', required: true, index: true }),
    __metadata("design:type", Types.ObjectId)
], Submission.prototype, "assignmentId", void 0);
__decorate([
    Prop({ type: Types.ObjectId, ref: 'User', required: true, index: true }),
    __metadata("design:type", Types.ObjectId)
], Submission.prototype, "studentId", void 0);
__decorate([
    Prop({ required: true, min: 0 }),
    __metadata("design:type", Number)
], Submission.prototype, "maxScoreSnapshot", void 0);
__decorate([
    Prop({ trim: true }),
    __metadata("design:type", String)
], Submission.prototype, "textContent", void 0);
__decorate([
    Prop({ type: [String], default: [] }),
    __metadata("design:type", Array)
], Submission.prototype, "fileUrls", void 0);
__decorate([
    Prop(),
    __metadata("design:type", Date)
], Submission.prototype, "submittedAt", void 0);
__decorate([
    Prop({
        min: 0,
        validate: {
            validator: function (v) {
                return v == null || v <= this.maxScoreSnapshot;
            },
            message: 'score vượt quá maxScore của bài tập',
        },
    }),
    __metadata("design:type", Number)
], Submission.prototype, "score", void 0);
__decorate([
    Prop({ trim: true, maxlength: 1000 }),
    __metadata("design:type", String)
], Submission.prototype, "feedback", void 0);
__decorate([
    Prop({ type: Types.ObjectId, ref: 'User' }),
    __metadata("design:type", Types.ObjectId)
], Submission.prototype, "gradedBy", void 0);
__decorate([
    Prop(),
    __metadata("design:type", Date)
], Submission.prototype, "gradedAt", void 0);
__decorate([
    Prop({ enum: ['not_submitted', 'submitted', 'late', 'graded'], default: 'not_submitted' }),
    __metadata("design:type", String)
], Submission.prototype, "status", void 0);
Submission = __decorate([
    Schema({ timestamps: true })
], Submission);
export { Submission };
export const SubmissionSchema = SchemaFactory.createForClass(Submission);
SubmissionSchema.index({ assignmentId: 1, studentId: 1 }, { unique: true });
//# sourceMappingURL=submission.schema.js.map