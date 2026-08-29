import { HydratedDocument, Types } from 'mongoose';
export type NotificationDocument = HydratedDocument<Notification>;
export declare class ReadReceipt {
    userId: Types.ObjectId;
    readAt: Date;
}
export declare const ReadReceiptSchema: import("mongoose").Schema<ReadReceipt, import("mongoose").Model<ReadReceipt, any, any, any, any, any, ReadReceipt>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, ReadReceipt, import("mongoose").Document<unknown, {}, ReadReceipt, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<ReadReceipt & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & import("mongoose").HydratedDocumentOverrides<{
    id: string;
}>, {
    userId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, ReadReceipt, import("mongoose").Document<unknown, {}, ReadReceipt, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<ReadReceipt & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    readAt?: import("mongoose").SchemaDefinitionProperty<Date, ReadReceipt, import("mongoose").Document<unknown, {}, ReadReceipt, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<ReadReceipt & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
}, ReadReceipt>;
export declare class Notification {
    institutionId: Types.ObjectId;
    senderId: Types.ObjectId;
    scope: 'institution' | 'class' | 'user';
    classId?: Types.ObjectId;
    recipientUserId?: Types.ObjectId;
    title: string;
    content: string;
    type: 'announcement' | 'assignment' | 'grade' | 'system';
    readBy: ReadReceipt[];
}
export declare const NotificationSchema: import("mongoose").Schema<Notification, import("mongoose").Model<Notification, any, any, any, any, any, Notification>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Notification, import("mongoose").Document<unknown, {}, Notification, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Notification & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & import("mongoose").HydratedDocumentOverrides<{
    id: string;
}>, {
    institutionId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, Notification, import("mongoose").Document<unknown, {}, Notification, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Notification & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    senderId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, Notification, import("mongoose").Document<unknown, {}, Notification, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Notification & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    scope?: import("mongoose").SchemaDefinitionProperty<"user" | "institution" | "class", Notification, import("mongoose").Document<unknown, {}, Notification, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Notification & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    classId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId | undefined, Notification, import("mongoose").Document<unknown, {}, Notification, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Notification & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    recipientUserId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId | undefined, Notification, import("mongoose").Document<unknown, {}, Notification, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Notification & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    title?: import("mongoose").SchemaDefinitionProperty<string, Notification, import("mongoose").Document<unknown, {}, Notification, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Notification & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    content?: import("mongoose").SchemaDefinitionProperty<string, Notification, import("mongoose").Document<unknown, {}, Notification, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Notification & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    type?: import("mongoose").SchemaDefinitionProperty<"grade" | "announcement" | "assignment" | "system", Notification, import("mongoose").Document<unknown, {}, Notification, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Notification & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    readBy?: import("mongoose").SchemaDefinitionProperty<ReadReceipt[], Notification, import("mongoose").Document<unknown, {}, Notification, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Notification & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
}, Notification>;
