import { Injectable, ForbiddenException, type CanActivate, type ExecutionContext } from '@nestjs/common';
import type { AuthenticatedUser } from '../types/authenticated-user.js';

/** Restricts a route to the single seeded admin account. Must run after JwtAuthGuard. */
@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const user = context.switchToHttp().getRequest().user as AuthenticatedUser | undefined;
    if (!user?.isAdmin) throw new ForbiddenException('Chỉ quản trị viên mới thực hiện được thao tác này');
    return true;
  }
}
