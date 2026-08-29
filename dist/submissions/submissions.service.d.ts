import { Model, Types } from 'mongoose';
import type { Connection } from 'mongoose';
import { Submission, type SubmissionDocument } from './schemas/submission.schema.js';
import { type AssignmentDocument } from '../assignments/schemas/assignment.schema.js';
import { SubmitAssignmentDto } from './dto/submit-assignment.dto.js';
import { GradeSubmissionDto } from './dto/grade-submission.dto.js';
import { ReportsService } from '../reports/reports.service.js';
import type { AuthenticatedUser } from '../common/types/authenticated-user.js';
export declare class SubmissionsService {
    private readonly connection;
    private readonly submissionModel;
    private readonly assignmentModel;
    private readonly reports;
    constructor(connection: Connection, submissionModel: Model<SubmissionDocument>, assignmentModel: Model<AssignmentDocument>, reports: ReportsService);
    submit(assignmentId: string, student: AuthenticatedUser, dto: SubmitAssignmentDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Submission, {}, import("mongoose").DefaultSchemaOptions> & Submission & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, Submission, {}, import("mongoose").DefaultSchemaOptions> & Submission & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: Types.ObjectId;
    }>>;
    findMine(assignmentId: string, studentId: string): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Submission, {}, import("mongoose").DefaultSchemaOptions> & Submission & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, Submission, {}, import("mongoose").DefaultSchemaOptions> & Submission & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: Types.ObjectId;
    }>) | null>;
    listForAssignment(assignmentId: string): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Submission, {}, import("mongoose").DefaultSchemaOptions> & Submission & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, Submission, {}, import("mongoose").DefaultSchemaOptions> & Submission & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: Types.ObjectId;
    }>)[]>;
    grade(submissionId: string, grader: AuthenticatedUser, dto: GradeSubmissionDto): Promise<import("mongoose").Document<unknown, {}, Submission, {}, import("mongoose").DefaultSchemaOptions> & Submission & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
}
