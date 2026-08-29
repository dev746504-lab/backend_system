import { HydratedDocument, Types } from 'mongoose';
export type ExamDocument = HydratedDocument<Exam>;
export declare class ExamQuestionRef {
    questionId: Types.ObjectId;
    weight: number;
}
export declare const ExamQuestionRefSchema: import("mongoose").Schema<ExamQuestionRef, import("mongoose").Model<ExamQuestionRef, any, any, any, any, any, ExamQuestionRef>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, ExamQuestionRef, import("mongoose").Document<unknown, {}, ExamQuestionRef, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<ExamQuestionRef & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & import("mongoose").HydratedDocumentOverrides<{
    id: string;
}>, {
    questionId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, ExamQuestionRef, import("mongoose").Document<unknown, {}, ExamQuestionRef, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<ExamQuestionRef & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    weight?: import("mongoose").SchemaDefinitionProperty<number, ExamQuestionRef, import("mongoose").Document<unknown, {}, ExamQuestionRef, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<ExamQuestionRef & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
}, ExamQuestionRef>;
export declare class Exam {
    institutionId: Types.ObjectId;
    createdBy: Types.ObjectId;
    title: string;
    type: 'exam' | 'quiz' | 'worksheet';
    questionRefs: ExamQuestionRef[];
    totalScore: number;
    durationMin?: number;
    status: 'draft' | 'published';
}
export declare const ExamSchema: import("mongoose").Schema<Exam, import("mongoose").Model<Exam, any, any, any, any, any, Exam>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Exam, import("mongoose").Document<unknown, {}, Exam, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Exam & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & import("mongoose").HydratedDocumentOverrides<{
    id: string;
}>, {
    institutionId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, Exam, import("mongoose").Document<unknown, {}, Exam, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Exam & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    createdBy?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, Exam, import("mongoose").Document<unknown, {}, Exam, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Exam & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    title?: import("mongoose").SchemaDefinitionProperty<string, Exam, import("mongoose").Document<unknown, {}, Exam, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Exam & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    type?: import("mongoose").SchemaDefinitionProperty<"exam" | "quiz" | "worksheet", Exam, import("mongoose").Document<unknown, {}, Exam, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Exam & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    questionRefs?: import("mongoose").SchemaDefinitionProperty<ExamQuestionRef[], Exam, import("mongoose").Document<unknown, {}, Exam, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Exam & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    totalScore?: import("mongoose").SchemaDefinitionProperty<number, Exam, import("mongoose").Document<unknown, {}, Exam, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Exam & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    durationMin?: import("mongoose").SchemaDefinitionProperty<number | undefined, Exam, import("mongoose").Document<unknown, {}, Exam, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Exam & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    status?: import("mongoose").SchemaDefinitionProperty<"draft" | "published", Exam, import("mongoose").Document<unknown, {}, Exam, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Exam & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
}, Exam>;
