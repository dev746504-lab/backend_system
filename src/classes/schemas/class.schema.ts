import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';

export type ClassDocument = HydratedDocument<Class>;

@Schema({ timestamps: true })
export class Class {
  @Prop({ type: SchemaTypes.ObjectId, ref: 'Institution', required: true, index: true })
  institutionId: Types.ObjectId;

  @Prop({ required: true, trim: true, maxlength: 120 })
  name: string;

  @Prop({ trim: true })
  subject?: string;

  @Prop({ trim: true })
  gradeLevel?: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'User' })
  homeroomTeacherId?: Types.ObjectId;

  @Prop({ required: true, trim: true })
  academicYear: string;

  @Prop({ enum: ['active', 'archived'], default: 'active' })
  status: 'active' | 'archived';
}

export const ClassSchema = SchemaFactory.createForClass(Class);
ClassSchema.index({ institutionId: 1, academicYear: 1 });
