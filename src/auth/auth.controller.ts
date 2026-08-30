import { Body, Controller, Get, HttpCode, Post, Req, Res, UnauthorizedException, UseGuards } from '@nestjs/common';
import type { Request, Response } from 'express';
import { AuthService } from './auth.service.js';
import { RegisterInstitutionDto } from './dto/register-institution.dto.js';
import { LoginDto } from './dto/login.dto.js';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard.js';
import { CurrentUser } from '../common/decorators/current-user.decorator.js';
import type { AuthenticatedUser } from '../common/types/authenticated-user.js';

const REFRESH_COOKIE = 'refresh_token';
/**
 * sameSite: 'none' — the browser only ever sees this cookie for direct
 * cross-origin calls to the backend (local dev without the frontend's /api
 * proxy, or hitting the API directly). Through the frontend's Next.js
 * rewrite proxy the request is same-origin instead and this setting is
 * simply more permissive than required, not wrong.
 *
 * path: '/' — the frontend calls this endpoint at two different path
 * shapes depending on how it's reached: '/auth/refresh' when the API is
 * hit directly, '/api/v1/auth/refresh' when proxied through the frontend's
 * own domain. A cookie scoped to '/auth' silently never matches the second
 * one, so the browser drops it and every reload looks like a fresh login.
 */
const REFRESH_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: true,
  sameSite: 'none' as const,
  path: '/',
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

@Controller('auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Post('register-institution')
  registerInstitution(@Body() dto: RegisterInstitutionDto) {
    return this.auth.registerInstitution(dto);
  }

  @Post('login')
  @HttpCode(200)
  async login(@Body() dto: LoginDto, @Res({ passthrough: true }) res: Response) {
    const { accessToken, refreshToken, user } = await this.auth.login(dto);
    res.cookie(REFRESH_COOKIE, refreshToken, REFRESH_COOKIE_OPTIONS);
    return { accessToken, user };
  }

  @Post('refresh')
  @HttpCode(200)
  refresh(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const token = req.cookies?.[REFRESH_COOKIE];
    if (!token) throw new UnauthorizedException('Thiếu refresh token');
    const { accessToken, refreshToken } = this.auth.refresh(token);
    res.cookie(REFRESH_COOKIE, refreshToken, REFRESH_COOKIE_OPTIONS);
    return { accessToken };
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  me(@CurrentUser() user: AuthenticatedUser) {
    return this.auth.me(user);
  }

  @Post('logout')
  @HttpCode(200)
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie(REFRESH_COOKIE, { path: '/' });
    return { message: 'Đã đăng xuất' };
  }
}
