import { Role } from '../../common/enums/role.enum.js';
export declare class AddMemberDto {
    email: string;
    fullName: string;
    role: Role.INSTITUTION_ADMIN | Role.TEACHER | Role.STUDENT;
    permissionSetId?: string;
}
