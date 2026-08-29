import { ClassesService } from './classes.service.js';
import { CreateClassDto } from './dto/create-class.dto.js';
import { AddClassMemberDto } from './dto/add-class-member.dto.js';
import type { AuthenticatedUser } from '../common/types/authenticated-user.js';
export declare class ClassesController {
    private readonly classes;
    constructor(classes: ClassesService);
    create(institutionId: string, dto: CreateClassDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./schemas/class.schema.js").Class, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/class.schema.js").Class & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("./schemas/class.schema.js").Class, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/class.schema.js").Class & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    list(institutionId: string, user: AuthenticatedUser): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./schemas/class.schema.js").Class, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/class.schema.js").Class & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("./schemas/class.schema.js").Class, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/class.schema.js").Class & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>)[]>;
    getOne(classId: string, user: AuthenticatedUser): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./schemas/class.schema.js").Class, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/class.schema.js").Class & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("./schemas/class.schema.js").Class, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/class.schema.js").Class & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    addMember(classId: string, user: AuthenticatedUser, dto: AddClassMemberDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./schemas/class-member.schema.js").ClassMember, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/class-member.schema.js").ClassMember & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("./schemas/class-member.schema.js").ClassMember, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/class-member.schema.js").ClassMember & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    listMembers(classId: string): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./schemas/class-member.schema.js").ClassMember, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/class-member.schema.js").ClassMember & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("./schemas/class-member.schema.js").ClassMember, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/class-member.schema.js").ClassMember & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>)[]>;
}
