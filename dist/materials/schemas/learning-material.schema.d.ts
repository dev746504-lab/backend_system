import { HydratedDocument, Types } from 'mongoose';
export type LearningMaterialDocument = HydratedDocument<LearningMaterial>;
export declare class LearningMaterial {
    institutionId: Types.ObjectId;
    ownerId: Types.ObjectId;
    title: string;
    type: 'video' | 'document' | 'image' | 'audio' | 'interactive';
    visibility: 'private' | 'class' | 'institution';
    sharedWithClassIds: Types.ObjectId[];
    subject?: string;
    gradeLevel?: string;
    tags: string[];
    fileUrl: string;
    fileSize?: number;
    mimeType?: string;
    moderationStatus: 'pending_review' | 'approved' | 'rejected';
    downloadCount: number;
}
export declare const LearningMaterialSchema: import("mongoose").Schema<LearningMaterial, import("mongoose").Model<LearningMaterial, any, any, any, any, any, LearningMaterial>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, LearningMaterial, import("mongoose").Document<unknown, {}, LearningMaterial, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<LearningMaterial & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & import("mongoose").HydratedDocumentOverrides<{
    id: string;
}>, {
    institutionId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, LearningMaterial, import("mongoose").Document<unknown, {}, LearningMaterial, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<LearningMaterial & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    ownerId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, LearningMaterial, import("mongoose").Document<unknown, {}, LearningMaterial, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<LearningMaterial & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    title?: import("mongoose").SchemaDefinitionProperty<string, LearningMaterial, import("mongoose").Document<unknown, {}, LearningMaterial, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<LearningMaterial & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    type?: import("mongoose").SchemaDefinitionProperty<"video" | "document" | "image" | "audio" | "interactive", LearningMaterial, import("mongoose").Document<unknown, {}, LearningMaterial, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<LearningMaterial & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    visibility?: import("mongoose").SchemaDefinitionProperty<"institution" | "private" | "class", LearningMaterial, import("mongoose").Document<unknown, {}, LearningMaterial, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<LearningMaterial & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    sharedWithClassIds?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId[], LearningMaterial, import("mongoose").Document<unknown, {}, LearningMaterial, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<LearningMaterial & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    subject?: import("mongoose").SchemaDefinitionProperty<string | undefined, LearningMaterial, import("mongoose").Document<unknown, {}, LearningMaterial, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<LearningMaterial & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    gradeLevel?: import("mongoose").SchemaDefinitionProperty<string | undefined, LearningMaterial, import("mongoose").Document<unknown, {}, LearningMaterial, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<LearningMaterial & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    tags?: import("mongoose").SchemaDefinitionProperty<string[], LearningMaterial, import("mongoose").Document<unknown, {}, LearningMaterial, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<LearningMaterial & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    fileUrl?: import("mongoose").SchemaDefinitionProperty<string, LearningMaterial, import("mongoose").Document<unknown, {}, LearningMaterial, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<LearningMaterial & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    fileSize?: import("mongoose").SchemaDefinitionProperty<number | undefined, LearningMaterial, import("mongoose").Document<unknown, {}, LearningMaterial, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<LearningMaterial & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    mimeType?: import("mongoose").SchemaDefinitionProperty<string | undefined, LearningMaterial, import("mongoose").Document<unknown, {}, LearningMaterial, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<LearningMaterial & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    moderationStatus?: import("mongoose").SchemaDefinitionProperty<"pending_review" | "approved" | "rejected", LearningMaterial, import("mongoose").Document<unknown, {}, LearningMaterial, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<LearningMaterial & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    downloadCount?: import("mongoose").SchemaDefinitionProperty<number, LearningMaterial, import("mongoose").Document<unknown, {}, LearningMaterial, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<LearningMaterial & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
}, LearningMaterial>;
