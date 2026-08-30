import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Notification, type NotificationDocument } from './schemas/notification.schema.js';
import { ClassMember, type ClassMemberDocument } from '../classes/schemas/class-member.schema.js';
import { SendNotificationDto } from './dto/send-notification.dto.js';
import type { AuthenticatedUser } from '../common/types/authenticated-user.js';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectModel(Notification.name) private readonly notificationModel: Model<NotificationDocument>,
    @InjectModel(ClassMember.name) private readonly classMemberModel: Model<ClassMemberDocument>,
  ) {}

  /** scope='system' (toàn hệ thống) chỉ admin gửi được; scope='class' phải là giáo viên phụ trách lớp đó. */
  async send(sender: AuthenticatedUser, dto: SendNotificationDto) {
    if (dto.scope === 'system' && !sender.isAdmin) {
      throw new ForbiddenException('Chỉ quản trị viên mới gửi được thông báo toàn hệ thống');
    }
    if (dto.scope === 'class') {
      if (!dto.classId) throw new BadRequestException('Thiếu classId cho thông báo theo lớp');
      const isTeacher =
        sender.isAdmin || (await this.classMemberModel.exists({ classId: dto.classId, userId: sender.userId, role: 'teacher', status: 'active' }));
      if (!isTeacher) throw new ForbiddenException('Bạn không phụ trách lớp này');
    }

    return this.notificationModel.create({
      senderId: sender.userId,
      scope: dto.scope,
      classId: dto.classId,
      recipientUserId: dto.recipientUserId,
      title: dto.title,
      content: dto.content,
      type: dto.type ?? 'announcement',
    });
  }

  async listForUser(user: AuthenticatedUser) {
    const myClasses = await this.classMemberModel.find({ userId: user.userId, status: 'active' }).exec();
    const classIds = myClasses.map((m) => m.classId);

    return this.notificationModel
      .find({
        $or: [{ scope: 'system' }, { scope: 'class', classId: { $in: classIds } }, { scope: 'user', recipientUserId: user.userId }],
      })
      .sort({ createdAt: -1 })
      .exec();
  }

  async markRead(notificationId: string, userId: string) {
    await this.notificationModel.updateOne(
      { _id: notificationId, 'readBy.userId': { $ne: userId } },
      { $push: { readBy: { userId, readAt: new Date() } } },
    );
  }
}
