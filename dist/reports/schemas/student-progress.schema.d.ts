import { HydratedDocument, Types } from 'mongoose';
export type StudentProgressDocument = HydratedDocument<StudentProgress>;
export declare class StudentProgress {
    studentId: Types.ObjectId;
    classId: Types.ObjectId;
    subject?: string;
    avgScore: number;
    completedCount: number;
    totalCount: number;
    lastGradedAt?: Date;
}
export declare const StudentProgressSchema: import("mongoose").Schema<StudentProgress, import("mongoose").Model<StudentProgress, any, any, any, any, any, StudentProgress>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, StudentProgress, import("mongoose").Document<unknown, {}, StudentProgress, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<StudentProgress & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & import("mongoose").HydratedDocumentOverrides<{
    id: string;
}>, {
    studentId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, StudentProgress, import("mongoose").Document<unknown, {}, StudentProgress, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<StudentProgress & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    classId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, StudentProgress, import("mongoose").Document<unknown, {}, StudentProgress, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<StudentProgress & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    subject?: import("mongoose").SchemaDefinitionProperty<string | undefined, StudentProgress, import("mongoose").Document<unknown, {}, StudentProgress, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<StudentProgress & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    avgScore?: import("mongoose").SchemaDefinitionProperty<number, StudentProgress, import("mongoose").Document<unknown, {}, StudentProgress, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<StudentProgress & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    completedCount?: import("mongoose").SchemaDefinitionProperty<number, StudentProgress, import("mongoose").Document<unknown, {}, StudentProgress, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<StudentProgress & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    totalCount?: import("mongoose").SchemaDefinitionProperty<number, StudentProgress, import("mongoose").Document<unknown, {}, StudentProgress, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<StudentProgress & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    lastGradedAt?: import("mongoose").SchemaDefinitionProperty<Date | undefined, StudentProgress, import("mongoose").Document<unknown, {}, StudentProgress, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<StudentProgress & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
}, StudentProgress>;
