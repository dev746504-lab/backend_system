import { Model, Types } from 'mongoose';
import { LearningMaterial, type LearningMaterialDocument } from './schemas/learning-material.schema.js';
import { type ClassMemberDocument } from '../classes/schemas/class-member.schema.js';
import { CreateMaterialDto } from './dto/create-material.dto.js';
import { ShareMaterialDto } from './dto/share-material.dto.js';
import type { AuthenticatedUser } from '../common/types/authenticated-user.js';
export declare class MaterialsService {
    private readonly materialModel;
    private readonly classMemberModel;
    constructor(materialModel: Model<LearningMaterialDocument>, classMemberModel: Model<ClassMemberDocument>);
    create(institutionId: string, ownerId: string, dto: CreateMaterialDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, LearningMaterial, {}, import("mongoose").DefaultSchemaOptions> & LearningMaterial & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, LearningMaterial, {}, import("mongoose").DefaultSchemaOptions> & LearningMaterial & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: Types.ObjectId;
    }>>;
    listVisible(institutionId: string, user: AuthenticatedUser): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, LearningMaterial, {}, import("mongoose").DefaultSchemaOptions> & LearningMaterial & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, LearningMaterial, {}, import("mongoose").DefaultSchemaOptions> & LearningMaterial & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: Types.ObjectId;
    }>)[]>;
    share(materialId: string, owner: AuthenticatedUser, dto: ShareMaterialDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, LearningMaterial, {}, import("mongoose").DefaultSchemaOptions> & LearningMaterial & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, LearningMaterial, {}, import("mongoose").DefaultSchemaOptions> & LearningMaterial & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: Types.ObjectId;
    }>>;
    moderate(materialId: string, institutionId: string, approve: boolean): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, LearningMaterial, {}, import("mongoose").DefaultSchemaOptions> & LearningMaterial & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, LearningMaterial, {}, import("mongoose").DefaultSchemaOptions> & LearningMaterial & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: Types.ObjectId;
    }>>;
    recordDownload(materialId: string, institutionId: string): Promise<void>;
}
