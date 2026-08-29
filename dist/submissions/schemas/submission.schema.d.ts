import { HydratedDocument, Types } from 'mongoose';
export type SubmissionDocument = HydratedDocument<Submission>;
export declare class Submission {
    assignmentId: Types.ObjectId;
    studentId: Types.ObjectId;
    maxScoreSnapshot: number;
    textContent?: string;
    fileUrls: string[];
    submittedAt?: Date;
    score?: number;
    feedback?: string;
    gradedBy?: Types.ObjectId;
    gradedAt?: Date;
    status: 'not_submitted' | 'submitted' | 'late' | 'graded';
}
export declare const SubmissionSchema: import("mongoose").Schema<Submission, import("mongoose").Model<Submission, any, any, any, any, any, Submission>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Submission, import("mongoose").Document<unknown, {}, Submission, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Submission & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & import("mongoose").HydratedDocumentOverrides<{
    id: string;
}>, {
    assignmentId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, Submission, import("mongoose").Document<unknown, {}, Submission, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Submission & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    studentId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, Submission, import("mongoose").Document<unknown, {}, Submission, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Submission & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    maxScoreSnapshot?: import("mongoose").SchemaDefinitionProperty<number, Submission, import("mongoose").Document<unknown, {}, Submission, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Submission & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    textContent?: import("mongoose").SchemaDefinitionProperty<string | undefined, Submission, import("mongoose").Document<unknown, {}, Submission, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Submission & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    fileUrls?: import("mongoose").SchemaDefinitionProperty<string[], Submission, import("mongoose").Document<unknown, {}, Submission, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Submission & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    submittedAt?: import("mongoose").SchemaDefinitionProperty<Date | undefined, Submission, import("mongoose").Document<unknown, {}, Submission, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Submission & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    score?: import("mongoose").SchemaDefinitionProperty<number | undefined, Submission, import("mongoose").Document<unknown, {}, Submission, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Submission & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    feedback?: import("mongoose").SchemaDefinitionProperty<string | undefined, Submission, import("mongoose").Document<unknown, {}, Submission, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Submission & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    gradedBy?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId | undefined, Submission, import("mongoose").Document<unknown, {}, Submission, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Submission & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    gradedAt?: import("mongoose").SchemaDefinitionProperty<Date | undefined, Submission, import("mongoose").Document<unknown, {}, Submission, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Submission & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    status?: import("mongoose").SchemaDefinitionProperty<"not_submitted" | "submitted" | "late" | "graded", Submission, import("mongoose").Document<unknown, {}, Submission, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Submission & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
}, Submission>;
