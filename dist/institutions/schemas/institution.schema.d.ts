import { HydratedDocument, Types } from 'mongoose';
export type InstitutionDocument = HydratedDocument<Institution>;
export declare class Institution {
    name: string;
    code: string;
    address?: string;
    contactEmail?: string;
    contactPhone?: string;
    plan: 'free' | 'standard' | 'premium';
    status: 'pending' | 'active' | 'suspended';
    createdBy: Types.ObjectId;
    approvedBy?: Types.ObjectId;
    approvedAt?: Date;
}
export declare const InstitutionSchema: import("mongoose").Schema<Institution, import("mongoose").Model<Institution, any, any, any, any, any, Institution>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Institution, import("mongoose").Document<unknown, {}, Institution, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<Institution & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, "id"> & import("mongoose").HydratedDocumentOverrides<{
    id: string;
}>, {
    name?: import("mongoose").SchemaDefinitionProperty<string, Institution, import("mongoose").Document<unknown, {}, Institution, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Institution & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    code?: import("mongoose").SchemaDefinitionProperty<string, Institution, import("mongoose").Document<unknown, {}, Institution, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Institution & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    address?: import("mongoose").SchemaDefinitionProperty<string | undefined, Institution, import("mongoose").Document<unknown, {}, Institution, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Institution & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    contactEmail?: import("mongoose").SchemaDefinitionProperty<string | undefined, Institution, import("mongoose").Document<unknown, {}, Institution, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Institution & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    contactPhone?: import("mongoose").SchemaDefinitionProperty<string | undefined, Institution, import("mongoose").Document<unknown, {}, Institution, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Institution & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    plan?: import("mongoose").SchemaDefinitionProperty<"free" | "standard" | "premium", Institution, import("mongoose").Document<unknown, {}, Institution, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Institution & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    status?: import("mongoose").SchemaDefinitionProperty<"active" | "pending" | "suspended", Institution, import("mongoose").Document<unknown, {}, Institution, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Institution & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    createdBy?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId, Institution, import("mongoose").Document<unknown, {}, Institution, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Institution & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    approvedBy?: import("mongoose").SchemaDefinitionProperty<Types.ObjectId | undefined, Institution, import("mongoose").Document<unknown, {}, Institution, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Institution & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
    approvedAt?: import("mongoose").SchemaDefinitionProperty<Date | undefined, Institution, import("mongoose").Document<unknown, {}, Institution, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<Institution & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & import("mongoose").HydratedDocumentOverrides<{
        id: string;
    }>> | undefined;
}, Institution>;
