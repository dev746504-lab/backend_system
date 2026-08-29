import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type PermissionSetDocument = HydratedDocument<PermissionSet>;

/**
 * Custom internal role a CSGD can define for staff members
 * (e.g. "Trợ lý học vụ": notifications:send + reports:view only).
 * A membership's effective permissions = base role permissions ∪ this set.
 */
@Schema({ timestamps: true })
export class PermissionSet {
  @Prop({ type: Types.ObjectId, ref: 'Institution', required: true, index: true })
  institutionId: Types.ObjectId;

  @Prop({ required: true, trim: true, maxlength: 80 })
  name: string;

  @Prop({ type: [String], default: [] })
  permissions: string[];

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  createdBy: Types.ObjectId;
}

export const PermissionSetSchema = SchemaFactory.createForClass(PermissionSet);
PermissionSetSchema.index({ institutionId: 1, name: 1 }, { unique: true });
