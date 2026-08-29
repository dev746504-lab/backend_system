import { HydratedDocument, Types } from 'mongoose';
export type ClassMemberDocument = HydratedDocument<ClassMember>;
export declare class ClassMember {
    classId: Types.ObjectId;
    userId: Types.ObjectId;
    role: 'teacher' | 'student';
    joinedAt: Date;
    status: 'active' | 'removed';
}
export declare const ClassMemberSchema: import("mongoose").Schema<ClassMember, import("mongoose").Model<ClassMember, any, any, any, any, any, ClassMember>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, ClassMember, import("mongoose").Document<unknown, {}, ClassMember, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<ClassMember & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & import("mongoose").HydratedDocumentOverrides<{
    id: string;
}>, {
    classId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, ClassMember, import("mongoose").Document<unknown, {}, ClassMember, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<ClassMember & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    userId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, ClassMember, import("mongoose").Document<unknown, {}, ClassMember, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<ClassMember & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    role?: import("mongoose").SchemaDefinitionProperty<"teacher" | "student", ClassMember, import("mongoose").Document<unknown, {}, ClassMember, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<ClassMember & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    joinedAt?: import("mongoose").SchemaDefinitionProperty<Date, ClassMember, import("mongoose").Document<unknown, {}, ClassMember, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<ClassMember & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    status?: import("mongoose").SchemaDefinitionProperty<"active" | "removed", ClassMember, import("mongoose").Document<unknown, {}, ClassMember, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<ClassMember & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
}, ClassMember>;
