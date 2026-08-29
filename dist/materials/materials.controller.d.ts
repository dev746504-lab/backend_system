import { MaterialsService } from './materials.service.js';
import { CreateMaterialDto } from './dto/create-material.dto.js';
import { ShareMaterialDto } from './dto/share-material.dto.js';
import type { AuthenticatedUser } from '../common/types/authenticated-user.js';
export declare class MaterialsController {
    private readonly materials;
    constructor(materials: MaterialsService);
    create(institutionId: string, user: AuthenticatedUser, dto: CreateMaterialDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./schemas/learning-material.schema.js").LearningMaterial, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/learning-material.schema.js").LearningMaterial & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("./schemas/learning-material.schema.js").LearningMaterial, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/learning-material.schema.js").LearningMaterial & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    list(institutionId: string, user: AuthenticatedUser): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./schemas/learning-material.schema.js").LearningMaterial, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/learning-material.schema.js").LearningMaterial & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("./schemas/learning-material.schema.js").LearningMaterial, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/learning-material.schema.js").LearningMaterial & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>)[]>;
    share(materialId: string, user: AuthenticatedUser, dto: ShareMaterialDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./schemas/learning-material.schema.js").LearningMaterial, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/learning-material.schema.js").LearningMaterial & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("./schemas/learning-material.schema.js").LearningMaterial, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/learning-material.schema.js").LearningMaterial & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    moderate(institutionId: string, materialId: string, approve: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./schemas/learning-material.schema.js").LearningMaterial, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/learning-material.schema.js").LearningMaterial & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("./schemas/learning-material.schema.js").LearningMaterial, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/learning-material.schema.js").LearningMaterial & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    recordDownload(institutionId: string, materialId: string): Promise<void>;
}
