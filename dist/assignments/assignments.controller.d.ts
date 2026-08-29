import { AssignmentsService } from './assignments.service.js';
import { CreateAssignmentDto } from './dto/create-assignment.dto.js';
import type { AuthenticatedUser } from '../common/types/authenticated-user.js';
export declare class AssignmentsController {
    private readonly assignments;
    constructor(assignments: AssignmentsService);
    create(classId: string, teacher: AuthenticatedUser, dto: CreateAssignmentDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./schemas/assignment.schema.js").Assignment, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/assignment.schema.js").Assignment & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("./schemas/assignment.schema.js").Assignment, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/assignment.schema.js").Assignment & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    listForClass(classId: string): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./schemas/assignment.schema.js").Assignment, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/assignment.schema.js").Assignment & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("./schemas/assignment.schema.js").Assignment, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/assignment.schema.js").Assignment & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>)[]>;
    getOne(assignmentId: string, user: AuthenticatedUser): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./schemas/assignment.schema.js").Assignment, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/assignment.schema.js").Assignment & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("./schemas/assignment.schema.js").Assignment, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/assignment.schema.js").Assignment & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
}
