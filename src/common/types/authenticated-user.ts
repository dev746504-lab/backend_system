import type { Role } from '../enums/role.enum.js';

/**
 * Shape of `request.user` after JwtStrategy.validate().
 * institutionId is null only for Role.SYSTEM_ADMIN — every other role
 * is always scoped to exactly one institution per token.
 */
export interface AuthenticatedUser {
  userId: string;
  email: string;
  role: Role;
  institutionId: string | null;
  membershipId: string | null;
}
