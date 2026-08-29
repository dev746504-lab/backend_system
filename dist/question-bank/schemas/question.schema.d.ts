import { HydratedDocument, Types } from 'mongoose';
export type QuestionDocument = HydratedDocument<Question>;
export declare class Question {
    institutionId: Types.ObjectId;
    ownerId: Types.ObjectId;
    subject?: string;
    topic?: string;
    type: 'multiple_choice' | 'true_false' | 'fill_blank' | 'essay';
    content: string;
    options: string[];
    correctAnswer?: string;
    difficulty: 'easy' | 'medium' | 'hard';
    tags: string[];
    sourceMaterialId?: Types.ObjectId;
}
export declare const QuestionSchema: import("mongoose").Schema<Question, import("mongoose").Model<Question, any, any, any, any, any, Question>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Question, import("mongoose").Document<unknown, {}, Question, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Question & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & import("mongoose").HydratedDocumentOverrides<{
    id: string;
}>, {
    institutionId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, Question, import("mongoose").Document<unknown, {}, Question, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Question & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    ownerId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, Question, import("mongoose").Document<unknown, {}, Question, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Question & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    subject?: import("mongoose").SchemaDefinitionProperty<string | undefined, Question, import("mongoose").Document<unknown, {}, Question, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Question & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    topic?: import("mongoose").SchemaDefinitionProperty<string | undefined, Question, import("mongoose").Document<unknown, {}, Question, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Question & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    type?: import("mongoose").SchemaDefinitionProperty<"multiple_choice" | "true_false" | "fill_blank" | "essay", Question, import("mongoose").Document<unknown, {}, Question, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Question & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    content?: import("mongoose").SchemaDefinitionProperty<string, Question, import("mongoose").Document<unknown, {}, Question, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Question & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    options?: import("mongoose").SchemaDefinitionProperty<string[], Question, import("mongoose").Document<unknown, {}, Question, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Question & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    correctAnswer?: import("mongoose").SchemaDefinitionProperty<string | undefined, Question, import("mongoose").Document<unknown, {}, Question, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Question & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    difficulty?: import("mongoose").SchemaDefinitionProperty<"easy" | "medium" | "hard", Question, import("mongoose").Document<unknown, {}, Question, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Question & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    tags?: import("mongoose").SchemaDefinitionProperty<string[], Question, import("mongoose").Document<unknown, {}, Question, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Question & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    sourceMaterialId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId | undefined, Question, import("mongoose").Document<unknown, {}, Question, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Question & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
}, Question>;
