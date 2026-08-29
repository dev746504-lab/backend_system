import { HydratedDocument, Types } from 'mongoose';
export type PermissionSetDocument = HydratedDocument<PermissionSet>;
export declare class PermissionSet {
    institutionId: Types.ObjectId;
    name: string;
    permissions: string[];
    createdBy: Types.ObjectId;
}
export declare const PermissionSetSchema: import("mongoose").Schema<PermissionSet, import("mongoose").Model<PermissionSet, any, any, any, any, any, PermissionSet>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, PermissionSet, import("mongoose").Document<unknown, {}, PermissionSet, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<PermissionSet & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & import("mongoose").HydratedDocumentOverrides<{
    id: string;
}>, {
    institutionId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, PermissionSet, import("mongoose").Document<unknown, {}, PermissionSet, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<PermissionSet & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    name?: import("mongoose").SchemaDefinitionProperty<string, PermissionSet, import("mongoose").Document<unknown, {}, PermissionSet, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<PermissionSet & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    permissions?: import("mongoose").SchemaDefinitionProperty<string[], PermissionSet, import("mongoose").Document<unknown, {}, PermissionSet, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<PermissionSet & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    createdBy?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, PermissionSet, import("mongoose").Document<unknown, {}, PermissionSet, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<PermissionSet & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
}, PermissionSet>;
