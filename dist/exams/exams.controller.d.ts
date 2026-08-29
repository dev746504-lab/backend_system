import { ExamsService } from './exams.service.js';
import { CreateExamDto } from './dto/create-exam.dto.js';
import type { AuthenticatedUser } from '../common/types/authenticated-user.js';
export declare class ExamsController {
    private readonly exams;
    constructor(exams: ExamsService);
    create(institutionId: string, user: AuthenticatedUser, dto: CreateExamDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./schemas/exam.schema.js").Exam, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/exam.schema.js").Exam & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("./schemas/exam.schema.js").Exam, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/exam.schema.js").Exam & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    publish(institutionId: string, examId: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./schemas/exam.schema.js").Exam, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/exam.schema.js").Exam & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("./schemas/exam.schema.js").Exam, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/exam.schema.js").Exam & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    getOne(institutionId: string, examId: string): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./schemas/exam.schema.js").Exam, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/exam.schema.js").Exam & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("./schemas/exam.schema.js").Exam, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/exam.schema.js").Exam & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>) | null>;
}
