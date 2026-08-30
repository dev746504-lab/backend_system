import type { Role } from '../enums/role.enum.js';

/** Shape of `request.user` after JwtStrategy.validate(). */
export interface AuthenticatedUser {
  userId: string;
  email: string;
  role: Role;
  /** True for exactly one seeded user — see User.isAdmin. */
  isAdmin: boolean;
}
