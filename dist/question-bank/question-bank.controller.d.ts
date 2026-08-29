import { QuestionBankService } from './question-bank.service.js';
import { CreateQuestionDto } from './dto/create-question.dto.js';
import type { AuthenticatedUser } from '../common/types/authenticated-user.js';
export declare class QuestionBankController {
    private readonly questions;
    constructor(questions: QuestionBankService);
    create(institutionId: string, user: AuthenticatedUser, dto: CreateQuestionDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./schemas/question.schema.js").Question, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/question.schema.js").Question & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("./schemas/question.schema.js").Question, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/question.schema.js").Question & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    search(institutionId: string, subject?: string, topic?: string): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./schemas/question.schema.js").Question, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/question.schema.js").Question & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("./schemas/question.schema.js").Question, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/question.schema.js").Question & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>)[]>;
}
