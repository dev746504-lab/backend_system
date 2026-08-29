import { HydratedDocument, Types } from 'mongoose';
export type AuditLogDocument = HydratedDocument<AuditLog>;
export declare class AuditLog {
    institutionId?: Types.ObjectId;
    userId: Types.ObjectId;
    action: string;
    resourceType: string;
    resourceId: Types.ObjectId;
    metadata?: Record<string, unknown>;
}
export declare const AuditLogSchema: import("mongoose").Schema<AuditLog, import("mongoose").Model<AuditLog, any, any, any, any, any, AuditLog>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, AuditLog, import("mongoose").Document<unknown, {}, AuditLog, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<AuditLog & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & import("mongoose").HydratedDocumentOverrides<{
    id: string;
}>, {
    institutionId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId | undefined, AuditLog, import("mongoose").Document<unknown, {}, AuditLog, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<AuditLog & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    userId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, AuditLog, import("mongoose").Document<unknown, {}, AuditLog, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<AuditLog & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    action?: import("mongoose").SchemaDefinitionProperty<string, AuditLog, import("mongoose").Document<unknown, {}, AuditLog, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<AuditLog & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    resourceType?: import("mongoose").SchemaDefinitionProperty<string, AuditLog, import("mongoose").Document<unknown, {}, AuditLog, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<AuditLog & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    resourceId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, AuditLog, import("mongoose").Document<unknown, {}, AuditLog, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<AuditLog & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    metadata?: import("mongoose").SchemaDefinitionProperty<Record<string, unknown> | undefined, AuditLog, import("mongoose").Document<unknown, {}, AuditLog, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<AuditLog & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
}, AuditLog>;
