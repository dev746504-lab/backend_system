import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Role } from '../../common/enums/role.enum.js';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true, lowercase: true, trim: true })
  email: string;

  @Prop({ required: true, select: false })
  passwordHash: string;

  @Prop({ required: true, trim: true, maxlength: 120 })
  fullName: string;

  @Prop({ trim: true })
  phone?: string;

  @Prop()
  avatarUrl?: string;

  /** Global — no more per-institution membership to derive it from. */
  @Prop({ enum: Role, required: true })
  role: Role;

  @Prop({ enum: ['active', 'locked'], default: 'active' })
  status: 'active' | 'locked';

  @Prop({ default: false })
  emailVerified: boolean;

  /** Highest authority in the system. Seeded directly in the database — never settable through the API. */
  @Prop({ default: false })
  isAdmin: boolean;

  @Prop()
  lastLoginAt?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
