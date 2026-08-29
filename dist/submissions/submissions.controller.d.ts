import { SubmissionsService } from './submissions.service.js';
import { SubmitAssignmentDto } from './dto/submit-assignment.dto.js';
import { GradeSubmissionDto } from './dto/grade-submission.dto.js';
import type { AuthenticatedUser } from '../common/types/authenticated-user.js';
export declare class SubmissionsController {
    private readonly submissions;
    constructor(submissions: SubmissionsService);
    submit(assignmentId: string, student: AuthenticatedUser, dto: SubmitAssignmentDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./schemas/submission.schema.js").Submission, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/submission.schema.js").Submission & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("./schemas/submission.schema.js").Submission, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/submission.schema.js").Submission & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    listForAssignment(assignmentId: string): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./schemas/submission.schema.js").Submission, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/submission.schema.js").Submission & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("./schemas/submission.schema.js").Submission, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/submission.schema.js").Submission & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>)[]>;
    findMine(assignmentId: string, student: AuthenticatedUser): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./schemas/submission.schema.js").Submission, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/submission.schema.js").Submission & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("./schemas/submission.schema.js").Submission, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/submission.schema.js").Submission & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>) | null>;
    grade(submissionId: string, teacher: AuthenticatedUser, dto: GradeSubmissionDto): Promise<import("mongoose").Document<unknown, {}, import("./schemas/submission.schema.js").Submission, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/submission.schema.js").Submission & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }>;
}
