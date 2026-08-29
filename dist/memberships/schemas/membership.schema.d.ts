import { HydratedDocument, Types } from 'mongoose';
import { Role } from '../../common/enums/role.enum.js';
export type MembershipDocument = HydratedDocument<Membership>;
export declare class Membership {
    userId: Types.ObjectId;
    institutionId: Types.ObjectId;
    role: Role.INSTITUTION_ADMIN | Role.TEACHER | Role.STUDENT;
    permissionSetId?: Types.ObjectId;
    status: 'invited' | 'active' | 'removed';
    joinedAt: Date;
}
export declare const MembershipSchema: import("mongoose").Schema<Membership, import("mongoose").Model<Membership, any, any, any, any, any, Membership>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Membership, import("mongoose").Document<unknown, {}, Membership, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Membership & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & import("mongoose").HydratedDocumentOverrides<{
    id: string;
}>, {
    userId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, Membership, import("mongoose").Document<unknown, {}, Membership, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Membership & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    institutionId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, Membership, import("mongoose").Document<unknown, {}, Membership, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Membership & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    role?: import("mongoose").SchemaDefinitionProperty<Role.INSTITUTION_ADMIN | Role.TEACHER | Role.STUDENT, Membership, import("mongoose").Document<unknown, {}, Membership, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Membership & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    permissionSetId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId | undefined, Membership, import("mongoose").Document<unknown, {}, Membership, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Membership & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    status?: import("mongoose").SchemaDefinitionProperty<"active" | "invited" | "removed", Membership, import("mongoose").Document<unknown, {}, Membership, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Membership & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    joinedAt?: import("mongoose").SchemaDefinitionProperty<Date, Membership, import("mongoose").Document<unknown, {}, Membership, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Membership & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
}, Membership>;
