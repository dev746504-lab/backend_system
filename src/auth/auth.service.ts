import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as argon2 from 'argon2';
import { UsersService } from '../users/users.service.js';
import { LoginDto } from './dto/login.dto.js';
import type { Role } from '../common/enums/role.enum.js';
import type { AuthenticatedUser } from '../common/types/authenticated-user.js';

@Injectable()
export class AuthService {
  constructor(
    private readonly users: UsersService,
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
  ) {}

  async login(dto: LoginDto) {
    const user = await this.users.findByEmail(dto.email);
    if (!user) throw new UnauthorizedException('Sai email hoặc mật khẩu');
    if (user.status === 'locked') throw new UnauthorizedException('Tài khoản đã bị khoá');

    const passwordOk = await argon2.verify(user.passwordHash, dto.password);
    if (!passwordOk) throw new UnauthorizedException('Sai email hoặc mật khẩu');

    await this.users.markLoggedIn(String(user._id));

    const authUser: AuthenticatedUser = { userId: String(user._id), email: user.email, role: user.role, isAdmin: user.isAdmin };
    return {
      ...this.issueTokens(authUser),
      user: { id: authUser.userId, email: authUser.email, fullName: user.fullName, role: authUser.role, isAdmin: authUser.isAdmin },
    };
  }

  issueTokens(authUser: AuthenticatedUser) {
    const payload = {
      sub: authUser.userId,
      email: authUser.email,
      role: authUser.role,
      isAdmin: authUser.isAdmin,
    };
    const accessToken = this.jwt.sign(payload, {
      secret: this.config.get<string>('JWT_ACCESS_SECRET'),
      expiresIn: '15m',
    });
    const refreshToken = this.jwt.sign(payload, {
      secret: this.config.get<string>('JWT_REFRESH_SECRET'),
      expiresIn: '7d',
    });
    return { accessToken, refreshToken };
  }

  async me(authUser: AuthenticatedUser) {
    const user = await this.users.findById(authUser.userId);
    if (!user) throw new UnauthorizedException();
    return {
      id: authUser.userId,
      email: user.email,
      fullName: user.fullName,
      role: authUser.role,
      isAdmin: authUser.isAdmin,
    };
  }

  refresh(refreshToken: string) {
    try {
      const payload = this.jwt.verify(refreshToken, { secret: this.config.get<string>('JWT_REFRESH_SECRET') });
      const authUser: AuthenticatedUser = {
        userId: payload.sub,
        email: payload.email,
        role: payload.role as Role,
        isAdmin: payload.isAdmin,
      };
      return this.issueTokens(authUser);
    } catch {
      throw new UnauthorizedException('Refresh token không hợp lệ hoặc đã hết hạn');
    }
  }
}
