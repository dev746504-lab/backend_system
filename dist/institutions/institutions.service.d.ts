import { Model, Types, type ClientSession } from 'mongoose';
import { Institution, type InstitutionDocument } from './schemas/institution.schema.js';
export declare class InstitutionsService {
    private readonly institutionModel;
    constructor(institutionModel: Model<InstitutionDocument>);
    create(data: {
        name: string;
        code: string;
        createdBy: Types.ObjectId | string;
        session?: ClientSession;
    }): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Institution, {}, import("mongoose").DefaultSchemaOptions> & Institution & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, Institution, {}, import("mongoose").DefaultSchemaOptions> & Institution & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: Types.ObjectId;
    }>)[]>;
    findById(id: string): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Institution, {}, import("mongoose").DefaultSchemaOptions> & Institution & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, Institution, {}, import("mongoose").DefaultSchemaOptions> & Institution & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: Types.ObjectId;
    }>) | null>;
    listPending(): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Institution, {}, import("mongoose").DefaultSchemaOptions> & Institution & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, Institution, {}, import("mongoose").DefaultSchemaOptions> & Institution & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: Types.ObjectId;
    }>)[]>;
    approve(id: string, approvedBy: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Institution, {}, import("mongoose").DefaultSchemaOptions> & Institution & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, Institution, {}, import("mongoose").DefaultSchemaOptions> & Institution & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: Types.ObjectId;
    }>>;
    suspend(id: string): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Institution, {}, import("mongoose").DefaultSchemaOptions> & Institution & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, Institution, {}, import("mongoose").DefaultSchemaOptions> & Institution & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: Types.ObjectId;
    }>) | null>;
}
