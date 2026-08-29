import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';

export type InstitutionDocument = HydratedDocument<Institution>;

@Schema({ timestamps: true })
export class Institution {
  @Prop({ required: true, trim: true, maxlength: 200 })
  name: string;

  /** Short unique slug used in URLs and staff-facing references. */
  @Prop({ required: true, unique: true, lowercase: true, trim: true })
  code: string;

  @Prop({ trim: true })
  address?: string;

  @Prop({ trim: true, lowercase: true })
  contactEmail?: string;

  @Prop({ trim: true })
  contactPhone?: string;

  @Prop({ enum: ['free', 'standard', 'premium'], default: 'free' })
  plan: 'free' | 'standard' | 'premium';

  /** pending until a system_admin approves the self-registration. */
  @Prop({ enum: ['pending', 'active', 'suspended'], default: 'pending' })
  status: 'pending' | 'active' | 'suspended';

  @Prop({ type: SchemaTypes.ObjectId, ref: 'User', required: true })
  createdBy: Types.ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'User' })
  approvedBy?: Types.ObjectId;

  @Prop()
  approvedAt?: Date;
}

export const InstitutionSchema = SchemaFactory.createForClass(Institution);
InstitutionSchema.index({ status: 1 });
