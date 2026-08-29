import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * Verifies the access token and populates request.user from JwtStrategy.
 * Every other guard in the app assumes this ran first.
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
