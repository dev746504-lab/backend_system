import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type QuestionDocument = HydratedDocument<Question>;

@Schema({ timestamps: true })
export class Question {
  @Prop({ type: Types.ObjectId, ref: 'Institution', required: true, index: true })
  institutionId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  ownerId: Types.ObjectId;

  @Prop({ trim: true })
  subject?: string;

  @Prop({ trim: true })
  topic?: string;

  @Prop({ enum: ['multiple_choice', 'true_false', 'fill_blank', 'essay'], required: true })
  type: 'multiple_choice' | 'true_false' | 'fill_blank' | 'essay';

  @Prop({ required: true, trim: true })
  content: string;

  @Prop({ type: [String], default: [] })
  options: string[];

  /** Index into `options` for multiple_choice, or literal text for fill_blank/true_false. Unused for essay. */
  @Prop()
  correctAnswer?: string;

  @Prop({ enum: ['easy', 'medium', 'hard'], default: 'medium' })
  difficulty: 'easy' | 'medium' | 'hard';

  @Prop({ type: [String], default: [] })
  tags: string[];

  @Prop({ type: Types.ObjectId, ref: 'LearningMaterial' })
  sourceMaterialId?: Types.ObjectId;
}

export const QuestionSchema = SchemaFactory.createForClass(Question);
QuestionSchema.index({ institutionId: 1, subject: 1, topic: 1 });
