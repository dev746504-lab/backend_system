import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

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

  @Prop({ enum: ['active', 'locked'], default: 'active' })
  status: 'active' | 'locked';

  @Prop({ default: false })
  emailVerified: boolean;

  /** Platform-level role, independent of any institution membership. Seeded directly in the database — never settable through the API. */
  @Prop({ default: false })
  isSystemAdmin: boolean;

  @Prop()
  lastLoginAt?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
