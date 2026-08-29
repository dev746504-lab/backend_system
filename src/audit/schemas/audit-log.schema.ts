import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type AuditLogDocument = HydratedDocument<AuditLog>;

/** Append-only: no service in this codebase should ever update or delete an AuditLog document. */
@Schema({ timestamps: { createdAt: true, updatedAt: false } })
export class AuditLog {
  @Prop({ type: Types.ObjectId, ref: 'Institution', index: true })
  institutionId?: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ required: true })
  action: string;

  @Prop({ required: true })
  resourceType: string;

  @Prop({ type: Types.ObjectId, required: true })
  resourceId: Types.ObjectId;

  @Prop({ type: Object })
  metadata?: Record<string, unknown>;
}

export const AuditLogSchema = SchemaFactory.createForClass(AuditLog);
AuditLogSchema.index({ institutionId: 1, createdAt: -1 });
