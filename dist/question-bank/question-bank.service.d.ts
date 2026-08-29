import { Model } from 'mongoose';
import { Question, type QuestionDocument } from './schemas/question.schema.js';
import { CreateQuestionDto } from './dto/create-question.dto.js';
export declare class QuestionBankService {
    private readonly questionModel;
    constructor(questionModel: Model<QuestionDocument>);
    create(institutionId: string, ownerId: string, dto: CreateQuestionDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Question, {}, import("mongoose").DefaultSchemaOptions> & Question & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, Question, {}, import("mongoose").DefaultSchemaOptions> & Question & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    search(institutionId: string, filters: {
        subject?: string;
        topic?: string;
    }): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Question, {}, import("mongoose").DefaultSchemaOptions> & Question & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, Question, {}, import("mongoose").DefaultSchemaOptions> & Question & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>)[]>;
    findByIds(ids: string[]): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Question, {}, import("mongoose").DefaultSchemaOptions> & Question & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, Question, {}, import("mongoose").DefaultSchemaOptions> & Question & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>)[]>;
}
