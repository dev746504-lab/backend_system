import { Model, Types, type ClientSession } from 'mongoose';
import { Membership, type MembershipDocument } from './schemas/membership.schema.js';
import { Role } from '../common/enums/role.enum.js';
export declare class MembershipsService {
    private readonly membershipModel;
    constructor(membershipModel: Model<MembershipDocument>);
    create(data: {
        userId: string | Types.ObjectId;
        institutionId: string | Types.ObjectId;
        role: Role.INSTITUTION_ADMIN | Role.TEACHER | Role.STUDENT;
        session?: ClientSession;
    }): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Membership, {}, import("mongoose").DefaultSchemaOptions> & Membership & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, Membership, {}, import("mongoose").DefaultSchemaOptions> & Membership & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: Types.ObjectId;
    }>)[]>;
    findFirstActiveForUser(userId: string): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Membership, {}, import("mongoose").DefaultSchemaOptions> & Membership & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, Membership, {}, import("mongoose").DefaultSchemaOptions> & Membership & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: Types.ObjectId;
    }>) | null>;
    findForUserAndInstitution(userId: string, institutionId: string): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Membership, {}, import("mongoose").DefaultSchemaOptions> & Membership & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, Membership, {}, import("mongoose").DefaultSchemaOptions> & Membership & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: Types.ObjectId;
    }>)[]>;
    listForInstitution(institutionId: string): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, Membership, {}, import("mongoose").DefaultSchemaOptions> & Membership & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, Membership, {}, import("mongoose").DefaultSchemaOptions> & Membership & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: Types.ObjectId;
    }>)[]>;
}
