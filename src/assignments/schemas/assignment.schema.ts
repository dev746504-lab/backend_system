import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';

export type AssignmentDocument = HydratedDocument<Assignment>;

@Schema({ timestamps: true })
export class Assignment {
  @Prop({ type: SchemaTypes.ObjectId, ref: 'Class', required: true, index: true })
  classId: Types.ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'User', required: true })
  teacherId: Types.ObjectId;

  @Prop({ required: true, trim: true, maxlength: 200 })
  title: string;

  @Prop({ trim: true })
  description?: string;

  @Prop({ enum: ['online', 'offline'], required: true })
  type: 'online' | 'offline';

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Exam' })
  examId?: Types.ObjectId;

  @Prop({ type: [SchemaTypes.ObjectId], ref: 'LearningMaterial', default: [] })
  attachedMaterialIds: Types.ObjectId[];

  @Prop({ required: true })
  dueDate: Date;

  @Prop({ required: true, min: 0 })
  maxScore: number;

  @Prop({ enum: ['draft', 'assigned', 'closed'], default: 'assigned' })
  status: 'draft' | 'assigned' | 'closed';
}

export const AssignmentSchema = SchemaFactory.createForClass(Assignment);
AssignmentSchema.index({ classId: 1, dueDate: 1 });

/** Ràng buộc nghiệp vụ: hạn nộp phải sau thời điểm tạo, đề online bắt buộc gắn examId. */
AssignmentSchema.pre('validate', function () {
  if (this.isNew && this.dueDate.getTime() <= Date.now()) {
    throw new Error('dueDate phải ở tương lai');
  }
  if (this.type === 'online' && !this.examId) {
    throw new Error('Bài tập online phải gắn một examId');
  }
});
