import { HydratedDocument, Types } from 'mongoose';
export type AssignmentDocument = HydratedDocument<Assignment>;
export declare class Assignment {
    institutionId: Types.ObjectId;
    classId: Types.ObjectId;
    teacherId: Types.ObjectId;
    title: string;
    description?: string;
    type: 'online' | 'offline';
    examId?: Types.ObjectId;
    attachedMaterialIds: Types.ObjectId[];
    dueDate: Date;
    maxScore: number;
    status: 'draft' | 'assigned' | 'closed';
}
export declare const AssignmentSchema: import("mongoose").Schema<Assignment, import("mongoose").Model<Assignment, any, any, any, any, any, Assignment>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Assignment, import("mongoose").Document<unknown, {}, Assignment, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Assignment & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & import("mongoose").HydratedDocumentOverrides<{
    id: string;
}>, {
    institutionId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, Assignment, import("mongoose").Document<unknown, {}, Assignment, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Assignment & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    classId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, Assignment, import("mongoose").Document<unknown, {}, Assignment, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Assignment & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    teacherId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, Assignment, import("mongoose").Document<unknown, {}, Assignment, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Assignment & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    title?: import("mongoose").SchemaDefinitionProperty<string, Assignment, import("mongoose").Document<unknown, {}, Assignment, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Assignment & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    description?: import("mongoose").SchemaDefinitionProperty<string | undefined, Assignment, import("mongoose").Document<unknown, {}, Assignment, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Assignment & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    type?: import("mongoose").SchemaDefinitionProperty<"online" | "offline", Assignment, import("mongoose").Document<unknown, {}, Assignment, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Assignment & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    examId?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId | undefined, Assignment, import("mongoose").Document<unknown, {}, Assignment, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Assignment & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    attachedMaterialIds?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId[], Assignment, import("mongoose").Document<unknown, {}, Assignment, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Assignment & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    dueDate?: import("mongoose").SchemaDefinitionProperty<Date, Assignment, import("mongoose").Document<unknown, {}, Assignment, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Assignment & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    maxScore?: import("mongoose").SchemaDefinitionProperty<number, Assignment, import("mongoose").Document<unknown, {}, Assignment, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Assignment & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    status?: import("mongoose").SchemaDefinitionProperty<"draft" | "assigned" | "closed", Assignment, import("mongoose").Document<unknown, {}, Assignment, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Assignment & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
}, Assignment>;
