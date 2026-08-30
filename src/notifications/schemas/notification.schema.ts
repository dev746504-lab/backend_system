import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes, Types } from 'mongoose';

export type NotificationDocument = HydratedDocument<Notification>;

@Schema({ _id: false })
export class ReadReceipt {
  @Prop({ type: SchemaTypes.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ required: true })
  readAt: Date;
}
export const ReadReceiptSchema = SchemaFactory.createForClass(ReadReceipt);

@Schema({ timestamps: true })
export class Notification {
  @Prop({ type: SchemaTypes.ObjectId, ref: 'User', required: true })
  senderId: Types.ObjectId;

  @Prop({ enum: ['system', 'class', 'user'], required: true })
  scope: 'system' | 'class' | 'user';

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Class' })
  classId?: Types.ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'User' })
  recipientUserId?: Types.ObjectId;

  @Prop({ required: true, trim: true, maxlength: 160 })
  title: string;

  @Prop({ required: true, trim: true, maxlength: 2000 })
  content: string;

  @Prop({ enum: ['announcement', 'assignment', 'grade', 'system'], default: 'announcement' })
  type: 'announcement' | 'assignment' | 'grade' | 'system';

  @Prop({ type: [ReadReceiptSchema], default: [] })
  readBy: ReadReceipt[];
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
NotificationSchema.index({ scope: 1, createdAt: -1 });
