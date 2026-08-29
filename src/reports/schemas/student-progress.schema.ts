import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';

export type StudentProgressDocument = HydratedDocument<StudentProgress>;

/**
 * Materialized rollup, recomputed inside the same transaction whenever a
 * submission is graded (see SubmissionsService.grade). Keeps dashboard
 * reads O(1) instead of re-aggregating every submission on every view.
 */
@Schema({ timestamps: true })
export class StudentProgress {
  @Prop({ type: SchemaTypes.ObjectId, ref: 'User', required: true, index: true })
  studentId: Types.ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Class', required: true, index: true })
  classId: Types.ObjectId;

  @Prop({ trim: true })
  subject?: string;

  @Prop({ default: 0 })
  avgScore: number;

  @Prop({ default: 0 })
  completedCount: number;

  @Prop({ default: 0 })
  totalCount: number;

  @Prop()
  lastGradedAt?: Date;
}

export const StudentProgressSchema = SchemaFactory.createForClass(StudentProgress);
StudentProgressSchema.index({ studentId: 1, classId: 1, subject: 1 }, { unique: true });
