var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Notification } from './schemas/notification.schema.js';
import { ClassMember } from '../classes/schemas/class-member.schema.js';
import { Role } from '../common/enums/role.enum.js';
let NotificationsService = class NotificationsService {
    notificationModel;
    classMemberModel;
    constructor(notificationModel, classMemberModel) {
        this.notificationModel = notificationModel;
        this.classMemberModel = classMemberModel;
    }
    async send(sender, dto) {
        if (dto.scope === 'institution' && sender.role !== Role.INSTITUTION_ADMIN) {
            throw new ForbiddenException('Chỉ CSGD được gửi thông báo toàn trường');
        }
        if (dto.scope === 'class') {
            if (!dto.classId)
                throw new BadRequestException('Thiếu classId cho thông báo theo lớp');
            if (sender.role === Role.TEACHER) {
                const isTeacher = await this.classMemberModel.exists({ classId: dto.classId, userId: sender.userId, role: 'teacher', status: 'active' });
                if (!isTeacher)
                    throw new ForbiddenException('Bạn không phụ trách lớp này');
            }
        }
        return this.notificationModel.create({
            institutionId: sender.institutionId,
            senderId: sender.userId,
            scope: dto.scope,
            classId: dto.classId,
            recipientUserId: dto.recipientUserId,
            title: dto.title,
            content: dto.content,
            type: dto.type ?? 'announcement',
        });
    }
    async listForUser(user) {
        const myClasses = await this.classMemberModel.find({ userId: user.userId, status: 'active' }).exec();
        const classIds = myClasses.map((m) => m.classId);
        return this.notificationModel
            .find({
            institutionId: user.institutionId,
            $or: [{ scope: 'institution' }, { scope: 'class', classId: { $in: classIds } }, { scope: 'user', recipientUserId: user.userId }],
        })
            .sort({ createdAt: -1 })
            .exec();
    }
    async markRead(notificationId, userId) {
        await this.notificationModel.updateOne({ _id: notificationId, 'readBy.userId': { $ne: userId } }, { $push: { readBy: { userId, readAt: new Date() } } });
    }
};
NotificationsService = __decorate([
    Injectable(),
    __param(0, InjectModel(Notification.name)),
    __param(1, InjectModel(ClassMember.name)),
    __metadata("design:paramtypes", [Model,
        Model])
], NotificationsService);
export { NotificationsService };
//# sourceMappingURL=notifications.service.js.map