import { Model } from 'mongoose';
import { Assignment, type AssignmentDocument } from './schemas/assignment.schema.js';
import { type ClassMemberDocument } from '../classes/schemas/class-member.schema.js';
import { CreateAssignmentDto } from './dto/create-assignment.dto.js';
import type { AuthenticatedUser } from '../common/types/authenticated-user.js';
export declare class AssignmentsService {
    private readonly assignmentModel;
    private readonly classMemberModel;
    constructor(assignmentModel: Model<AssignmentDocument>, classMemberModel: Model<ClassMemberDocument>);
    create(classId: string, teacher: AuthenticatedUser, dto: CreateAssignmentDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Assignment, {}, import("mongoose").DefaultSchemaOptions> & Assignment & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, Assignment, {}, import("mongoose").DefaultSchemaOptions> & Assignment & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    listForClass(classId: string): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Assignment, {}, import("mongoose").DefaultSchemaOptions> & Assignment & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, Assignment, {}, import("mongoose").DefaultSchemaOptions> & Assignment & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>)[]>;
    findByIdForUser(assignmentId: string, user: AuthenticatedUser): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Assignment, {}, import("mongoose").DefaultSchemaOptions> & Assignment & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, Assignment, {}, import("mongoose").DefaultSchemaOptions> & Assignment & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
}
