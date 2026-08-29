import { InstitutionsService } from './institutions.service.js';
import { MembershipsService } from '../memberships/memberships.service.js';
import { UsersService } from '../users/users.service.js';
import { AddMemberDto } from './dto/add-member.dto.js';
import { Role } from '../common/enums/role.enum.js';
import type { AuthenticatedUser } from '../common/types/authenticated-user.js';
export declare class InstitutionsController {
    private readonly institutions;
    private readonly memberships;
    private readonly users;
    constructor(institutions: InstitutionsService, memberships: MembershipsService, users: UsersService);
    listPending(): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./schemas/institution.schema.js").Institution, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/institution.schema.js").Institution & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("./schemas/institution.schema.js").Institution, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/institution.schema.js").Institution & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>)[]>;
    approve(id: string, admin: AuthenticatedUser): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./schemas/institution.schema.js").Institution, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/institution.schema.js").Institution & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("./schemas/institution.schema.js").Institution, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/institution.schema.js").Institution & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    suspend(id: string): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./schemas/institution.schema.js").Institution, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/institution.schema.js").Institution & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("./schemas/institution.schema.js").Institution, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/institution.schema.js").Institution & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>) | null>;
    getOne(id: string): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./schemas/institution.schema.js").Institution, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/institution.schema.js").Institution & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("./schemas/institution.schema.js").Institution, {}, import("mongoose").DefaultSchemaOptions> & import("./schemas/institution.schema.js").Institution & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>) | null>;
    listMembers(institutionId: string): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("../memberships/schemas/membership.schema.js").Membership, {}, import("mongoose").DefaultSchemaOptions> & import("../memberships/schemas/membership.schema.js").Membership & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    }, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").Document<unknown, {}, import("../memberships/schemas/membership.schema.js").Membership, {}, import("mongoose").DefaultSchemaOptions> & import("../memberships/schemas/membership.schema.js").Membership & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    } & {
        id: string;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>)[]>;
    addMember(institutionId: string, dto: AddMemberDto): Promise<{
        userId: import("mongoose").Types.ObjectId;
        email: string;
        role: Role.INSTITUTION_ADMIN | Role.TEACHER | Role.STUDENT;
    }>;
}
