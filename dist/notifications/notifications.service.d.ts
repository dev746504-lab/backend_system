import { Model } from 'mongoose';
import { Notification, type NotificationDocument } from './schemas/notification.schema.js';
import { type ClassMemberDocument } from '../classes/schemas/class-member.schema.js';
import { SendNotificationDto } from './dto/send-notification.dto.js';
import type { AuthenticatedUser } from '../common/types/authenticated-user.js';
export declare class NotificationsService {
    private readonly notificationModel;
    private readonly classMemberModel;
    constructor(notificationModel: Model<NotificationDocument>, classMemberModel: Model<ClassMemberDocument>);
    send(sender: AuthenticatedUser, dto: SendNotificationDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Notification, {}, import("mongoose").DefaultSchemaOptions> & Notification & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, Notification, {}, import("mongoose").DefaultSchemaOptions> & Notification & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    listForUser(user: AuthenticatedUser): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Notification, {}, import("mongoose").DefaultSchemaOptions> & Notification & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, Notification, {}, import("mongoose").DefaultSchemaOptions> & Notification & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>)[]>;
    markRead(notificationId: string, userId: string): Promise<void>;
}
