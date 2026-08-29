import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type ClassMemberDocument = HydratedDocument<ClassMember>;

@Schema({ timestamps: true })
export class ClassMember {
  @Prop({ type: Types.ObjectId, ref: 'Class', required: true, index: true })
  classId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true, index: true })
  userId: Types.ObjectId;

  @Prop({ enum: ['teacher', 'student'], required: true })
  role: 'teacher' | 'student';

  @Prop({ default: () => new Date() })
  joinedAt: Date;

  @Prop({ enum: ['active', 'removed'], default: 'active' })
  status: 'active' | 'removed';
}

export const ClassMemberSchema = SchemaFactory.createForClass(ClassMember);
ClassMemberSchema.index({ classId: 1, userId: 1 }, { unique: true });
