import { Model } from 'mongoose';
import { Exam, type ExamDocument } from './schemas/exam.schema.js';
import { CreateExamDto } from './dto/create-exam.dto.js';
export declare class ExamsService {
    private readonly examModel;
    constructor(examModel: Model<ExamDocument>);
    create(institutionId: string, createdBy: string, dto: CreateExamDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Exam, {}, import("mongoose").DefaultSchemaOptions> & Exam & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, Exam, {}, import("mongoose").DefaultSchemaOptions> & Exam & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    publish(examId: string, institutionId: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Exam, {}, import("mongoose").DefaultSchemaOptions> & Exam & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, Exam, {}, import("mongoose").DefaultSchemaOptions> & Exam & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    findById(examId: string, institutionId: string): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Exam, {}, import("mongoose").DefaultSchemaOptions> & Exam & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, Exam, {}, import("mongoose").DefaultSchemaOptions> & Exam & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>) | null>;
}
