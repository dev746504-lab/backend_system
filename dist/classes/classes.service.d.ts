import { Model } from 'mongoose';
import { Class, type ClassDocument } from './schemas/class.schema.js';
import { ClassMember, type ClassMemberDocument } from './schemas/class-member.schema.js';
import { CreateClassDto } from './dto/create-class.dto.js';
import { AddClassMemberDto } from './dto/add-class-member.dto.js';
import type { AuthenticatedUser } from '../common/types/authenticated-user.js';
export declare class ClassesService {
    private readonly classModel;
    private readonly classMemberModel;
    constructor(classModel: Model<ClassDocument>, classMemberModel: Model<ClassMemberDocument>);
    create(institutionId: string, dto: CreateClassDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Class, {}, import("mongoose").DefaultSchemaOptions> & Class & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, Class, {}, import("mongoose").DefaultSchemaOptions> & Class & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    listForUser(institutionId: string, user: AuthenticatedUser): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Class, {}, import("mongoose").DefaultSchemaOptions> & Class & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, Class, {}, import("mongoose").DefaultSchemaOptions> & Class & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>)[]>;
    findByIdForUser(classId: string, user: AuthenticatedUser): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Class, {}, import("mongoose").DefaultSchemaOptions> & Class & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, Class, {}, import("mongoose").DefaultSchemaOptions> & Class & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    addMember(classId: string, institutionId: string, dto: AddClassMemberDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, ClassMember, {}, import("mongoose").DefaultSchemaOptions> & ClassMember & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, ClassMember, {}, import("mongoose").DefaultSchemaOptions> & ClassMember & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    listMembers(classId: string): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, ClassMember, {}, import("mongoose").DefaultSchemaOptions> & ClassMember & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, ClassMember, {}, import("mongoose").DefaultSchemaOptions> & ClassMember & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>)[]>;
    isTeacherOfClass(classId: string, userId: string): import("mongoose").Query<{
        _id: import("mongoose").Types.ObjectId;
    } | null, import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, ClassMember, {}, import("mongoose").DefaultSchemaOptions> & ClassMember & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, ClassMember, {}, import("mongoose").DefaultSchemaOptions> & ClassMember & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>, {}, import("mongoose").Document<unknown, {}, ClassMember, {}, import("mongoose").DefaultSchemaOptions> & ClassMember & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, "findOne", {}>;
    isStudentOfClass(classId: string, userId: string): import("mongoose").Query<{
        _id: import("mongoose").Types.ObjectId;
    } | null, import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, ClassMember, {}, import("mongoose").DefaultSchemaOptions> & ClassMember & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, ClassMember, {}, import("mongoose").DefaultSchemaOptions> & ClassMember & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>, {}, import("mongoose").Document<unknown, {}, ClassMember, {}, import("mongoose").DefaultSchemaOptions> & ClassMember & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, "findOne", {}>;
}
