import { ReportsService } from './reports.service.js';
import type { AuthenticatedUser } from '../common/types/authenticated-user.js';
export declare class ReportsController {
    private readonly reports;
    constructor(reports: ReportsService);
    forStudent(studentId: string, user: AuthenticatedUser, classId?: string): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./schemas/student-progress.schema.js").StudentProgress, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/student-progress.schema.js").StudentProgress & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("./schemas/student-progress.schema.js").StudentProgress, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/student-progress.schema.js").StudentProgress & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>)[]>;
    forClass(classId: string): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./schemas/student-progress.schema.js").StudentProgress, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/student-progress.schema.js").StudentProgress & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("./schemas/student-progress.schema.js").StudentProgress, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/student-progress.schema.js").StudentProgress & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>)[]>;
}
