import { Injectable, ForbiddenException, type CanActivate, type ExecutionContext } from '@nestjs/common';
import { Role } from '../enums/role.enum.js';
import type { AuthenticatedUser } from '../types/authenticated-user.js';

/**
 * Blocks cross-tenant access on routes shaped as /institutions/:institutionId/...
 * A CSGD admin/teacher/student can only ever touch their own institutionId,
 * regardless of what the URL asks for. System admin is exempt (platform-level).
 */
@Injectable()
export class TenantGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user as AuthenticatedUser | undefined;
    const paramInstitutionId = request.params?.institutionId;

    if (!user) throw new ForbiddenException();
    if (user.role === Role.SYSTEM_ADMIN) return true;
    if (!paramInstitutionId) return true;

    if (paramInstitutionId !== user.institutionId) {
      throw new ForbiddenException('Không thể truy cập dữ liệu của cơ sở giáo dục khác');
    }
    return true;
  }
}
