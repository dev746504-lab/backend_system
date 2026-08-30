import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';

export type ClassDocument = HydratedDocument<Class>;

@Schema({ timestamps: true })
export class Class {
  /** Owning teacher — source of truth for "whose class is this" (a ClassMember row for them exists too, kept in sync at creation). */
  @Prop({ type: SchemaTypes.ObjectId, ref: 'User', required: true, index: true })
  teacherId: Types.ObjectId;

  @Prop({ required: true, trim: true, maxlength: 120 })
  name: string;

  @Prop({ trim: true })
  subject?: string;

  @Prop({ trim: true })
  gradeLevel?: string;

  @Prop({ required: true, trim: true })
  academicYear: string;

  @Prop({ enum: ['active', 'archived'], default: 'active' })
  status: 'active' | 'archived';
}

export const ClassSchema = SchemaFactory.createForClass(Class);
ClassSchema.index({ teacherId: 1, academicYear: 1 });
