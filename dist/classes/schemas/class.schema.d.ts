import { HydratedDocument, Types } from 'mongoose';
export type ClassDocument = HydratedDocument<Class>;
export declare class Class {
    institutionId: Types.ObjectId;
    name: string;
    subject?: string;
    gradeLevel?: string;
    homeroomTeacherId?: Types.ObjectId;
    academicYear: string;
    status: 'active' | 'archived';
}
export declare const ClassSchema: import("mongoose").Schema<Class, import("mongoose").Model<Class, any, any, any, any, any, Class>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Class, import("mongoose").Document<unknown, {}, Class, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Class & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & import("mongoose").HydratedDocumentOverrides<{
    id: string;
}>, {
    institutionId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, Class, import("mongoose").Document<unknown, {}, Class, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Class & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    name?: import("mongoose").SchemaDefinitionProperty<string, Class, import("mongoose").Document<unknown, {}, Class, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Class & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    subject?: import("mongoose").SchemaDefinitionProperty<string | undefined, Class, import("mongoose").Document<unknown, {}, Class, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Class & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    gradeLevel?: import("mongoose").SchemaDefinitionProperty<string | undefined, Class, import("mongoose").Document<unknown, {}, Class, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Class & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    homeroomTeacherId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId | undefined, Class, import("mongoose").Document<unknown, {}, Class, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Class & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    academicYear?: import("mongoose").SchemaDefinitionProperty<string, Class, import("mongoose").Document<unknown, {}, Class, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Class & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    status?: import("mongoose").SchemaDefinitionProperty<"active" | "archived", Class, import("mongoose").Document<unknown, {}, Class, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Class & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
}, Class>;
