import { Model, type ClientSession } from 'mongoose';
import { StudentProgress, type StudentProgressDocument } from './schemas/student-progress.schema.js';
import { type SubmissionDocument } from '../submissions/schemas/submission.schema.js';
import { type AssignmentDocument } from '../assignments/schemas/assignment.schema.js';
import { type ClassDocument } from '../classes/schemas/class.schema.js';
export declare class ReportsService {
    private readonly progressModel;
    private readonly submissionModel;
    private readonly assignmentModel;
    private readonly classModel;
    constructor(progressModel: Model<StudentProgressDocument>, submissionModel: Model<SubmissionDocument>, assignmentModel: Model<AssignmentDocument>, classModel: Model<ClassDocument>);
    recompute(studentId: string, classId: string, session: ClientSession): Promise<void>;
    forStudent(studentId: string, classId?: string): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, StudentProgress, {}, import("mongoose").DefaultSchemaOptions> & StudentProgress & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, StudentProgress, {}, import("mongoose").DefaultSchemaOptions> & StudentProgress & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>)[]>;
    forClass(classId: string): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, StudentProgress, {}, import("mongoose").DefaultSchemaOptions> & StudentProgress & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, StudentProgress, {}, import("mongoose").DefaultSchemaOptions> & StudentProgress & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>)[]>;
}
