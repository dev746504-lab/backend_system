import { NotificationsService } from './notifications.service.js';
import { SendNotificationDto } from './dto/send-notification.dto.js';
import type { AuthenticatedUser } from '../common/types/authenticated-user.js';
export declare class NotificationsController {
    private readonly notifications;
    constructor(notifications: NotificationsService);
    send(sender: AuthenticatedUser, dto: SendNotificationDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./schemas/notification.schema.js").Notification, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/notification.schema.js").Notification & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("./schemas/notification.schema.js").Notification, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/notification.schema.js").Notification & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    list(user: AuthenticatedUser): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./schemas/notification.schema.js").Notification, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/notification.schema.js").Notification & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("./schemas/notification.schema.js").Notification, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/notification.schema.js").Notification & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>)[]>;
    markRead(id: string, user: AuthenticatedUser): Promise<void>;
}
