import { type CanActivate, type ExecutionContext } from '@nestjs/common';
export declare class TenantGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean;
}
