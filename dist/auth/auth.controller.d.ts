import type { Request, Response } from 'express';
import { AuthService } from './auth.service.js';
import { RegisterInstitutionDto } from './dto/register-institution.dto.js';
import { LoginDto } from './dto/login.dto.js';
import type { AuthenticatedUser } from '../common/types/authenticated-user.js';
export declare class AuthController {
    private readonly auth;
    constructor(auth: AuthService);
    registerInstitution(dto: RegisterInstitutionDto): Promise<{
        userId: string;
        institutionId: string;
        message: string;
    }>;
    login(dto: LoginDto, res: Response): Promise<{
        accessToken: string;
        user: {
            id: string;
            email: string;
            fullName: string;
            role: import("../common/enums/role.enum.js").Role;
            institutionId: string | null;
        };
    }>;
    refresh(req: Request, res: Response): {
        accessToken: string;
    };
    me(user: AuthenticatedUser): Promise<{
        id: string;
        email: string;
        fullName: string;
        role: import("../common/enums/role.enum.js").Role;
        institutionId: string | null;
    }>;
    logout(res: Response): {
        message: string;
    };
}
