import { ConfigService } from '@nestjs/config';
import { Strategy } from 'passport-jwt';
import type { AuthenticatedUser } from '../../common/types/authenticated-user.js';
import type { Role } from '../../common/enums/role.enum.js';
interface JwtPayload {
    sub: string;
    email: string;
    role: Role;
    institutionId: string | null;
    membershipId: string | null;
}
declare const JwtStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class JwtStrategy extends JwtStrategy_base {
    constructor(config: ConfigService);
    validate(payload: JwtPayload): AuthenticatedUser;
}
export {};
