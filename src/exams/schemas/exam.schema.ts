import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type ExamDocument = HydratedDocument<Exam>;

@Schema({ _id: false })
export class ExamQuestionRef {
  @Prop({ type: Types.ObjectId, ref: 'Question', required: true })
  questionId: Types.ObjectId;

  @Prop({ required: true, min: 0 })
  weight: number;
}
export const ExamQuestionRefSchema = SchemaFactory.createForClass(ExamQuestionRef);

@Schema({ timestamps: true })
export class Exam {
  @Prop({ type: Types.ObjectId, ref: 'Institution', required: true, index: true })
  institutionId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  createdBy: Types.ObjectId;

  @Prop({ required: true, trim: true, maxlength: 200 })
  title: string;

  @Prop({ enum: ['exam', 'quiz', 'worksheet'], required: true })
  type: 'exam' | 'quiz' | 'worksheet';

  @Prop({ type: [ExamQuestionRefSchema], default: [] })
  questionRefs: ExamQuestionRef[];

  @Prop({ required: true, min: 0 })
  totalScore: number;

  @Prop({ min: 1 })
  durationMin?: number;

  @Prop({ enum: ['draft', 'published'], default: 'draft' })
  status: 'draft' | 'published';
}

export const ExamSchema = SchemaFactory.createForClass(Exam);

/** Ràng buộc nghiệp vụ: tổng trọng số câu hỏi phải khớp tổng điểm của đề. */
ExamSchema.pre('validate', function () {
  const sumWeight = this.questionRefs.reduce((acc, q) => acc + q.weight, 0);
  if (this.questionRefs.length > 0 && Math.abs(sumWeight - this.totalScore) > 0.001) {
    throw new Error(`Tổng trọng số câu hỏi (${sumWeight}) phải bằng totalScore (${this.totalScore})`);
  }
});
