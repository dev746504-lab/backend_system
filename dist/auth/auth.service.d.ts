import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import type { Connection } from 'mongoose';
import { UsersService } from '../users/users.service.js';
import { InstitutionsService } from '../institutions/institutions.service.js';
import { MembershipsService } from '../memberships/memberships.service.js';
import { RegisterInstitutionDto } from './dto/register-institution.dto.js';
import { LoginDto } from './dto/login.dto.js';
import { Role } from '../common/enums/role.enum.js';
import type { AuthenticatedUser } from '../common/types/authenticated-user.js';
export declare class AuthService {
    private readonly connection;
    private readonly users;
    private readonly institutions;
    private readonly memberships;
    private readonly jwt;
    private readonly config;
    constructor(connection: Connection, users: UsersService, institutions: InstitutionsService, memberships: MembershipsService, jwt: JwtService, config: ConfigService);
    registerInstitution(dto: RegisterInstitutionDto): Promise<{
        userId: string;
        institutionId: string;
        message: string;
    }>;
    login(dto: LoginDto): Promise<{
        user: {
            id: string;
            email: string;
            fullName: string;
            role: Role;
            institutionId: string | null;
        };
        accessToken: string;
        refreshToken: string;
    }>;
    issueTokens(authUser: AuthenticatedUser): {
        accessToken: string;
        refreshToken: string;
    };
    me(authUser: AuthenticatedUser): Promise<{
        id: string;
        email: string;
        fullName: string;
        role: Role;
        institutionId: string | null;
    }>;
    refresh(refreshToken: string): {
        accessToken: string;
        refreshToken: string;
    };
}
