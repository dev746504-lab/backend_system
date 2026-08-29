import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Notification, NotificationSchema } from './schemas/notification.schema.js';
import { ClassMember, ClassMemberSchema } from '../classes/schemas/class-member.schema.js';
import { NotificationsService } from './notifications.service.js';
import { NotificationsController } from './notifications.controller.js';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Notification.name, schema: NotificationSchema },
      { name: ClassMember.name, schema: ClassMemberSchema },
    ]),
  ],
  controllers: [NotificationsController],
  providers: [NotificationsService],
  exports: [MongooseModule],
})
export class NotificationsModule {}
