import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';
import { Role } from '../../common/enums/role.enum.js';

export type MembershipDocument = HydratedDocument<Membership>;

@Schema({ timestamps: true })
export class Membership {
  @Prop({ type: SchemaTypes.ObjectId, ref: 'User', required: true, index: true })
  userId: Types.ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Institution', required: true, index: true })
  institutionId: Types.ObjectId;

  @Prop({ enum: [Role.TEACHER, Role.STUDENT], required: true })
  role: Role.TEACHER | Role.STUDENT;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'PermissionSet' })
  permissionSetId?: Types.ObjectId;

  @Prop({ enum: ['invited', 'active', 'removed'], default: 'active' })
  status: 'invited' | 'active' | 'removed';

  @Prop({ default: () => new Date() })
  joinedAt: Date;
}

export const MembershipSchema = SchemaFactory.createForClass(Membership);
MembershipSchema.index({ userId: 1, institutionId: 1, role: 1 }, { unique: true });
