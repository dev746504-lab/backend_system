import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';

export type LearningMaterialDocument = HydratedDocument<LearningMaterial>;

@Schema({ timestamps: true })
export class LearningMaterial {
  @Prop({ type: SchemaTypes.ObjectId, ref: 'User', required: true, index: true })
  ownerId: Types.ObjectId;

  @Prop({ required: true, trim: true, maxlength: 200 })
  title: string;

  @Prop({ enum: ['video', 'document', 'image', 'audio', 'interactive'], required: true })
  type: 'video' | 'document' | 'image' | 'audio' | 'interactive';

  /** private = chỉ chủ sở hữu; class = chia sẻ theo lớp; system = kho chung toàn hệ thống. */
  @Prop({ enum: ['private', 'class', 'system'], default: 'private' })
  visibility: 'private' | 'class' | 'system';

  @Prop({ type: [SchemaTypes.ObjectId], ref: 'Class', default: [] })
  sharedWithClassIds: Types.ObjectId[];

  @Prop({ trim: true })
  subject?: string;

  @Prop({ trim: true })
  gradeLevel?: string;

  @Prop({ type: [String], default: [] })
  tags: string[];

  @Prop({ required: true })
  fileUrl: string;

  @Prop()
  fileSize?: number;

  @Prop()
  mimeType?: string;

  @Prop({ enum: ['pending_review', 'approved', 'rejected'], default: 'approved' })
  moderationStatus: 'pending_review' | 'approved' | 'rejected';

  @Prop({ default: 0 })
  downloadCount: number;
}

export const LearningMaterialSchema = SchemaFactory.createForClass(LearningMaterial);
LearningMaterialSchema.index({ subject: 1, gradeLevel: 1 });
LearningMaterialSchema.index({ title: 'text', tags: 'text' });
