var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Body, Controller, Get, HttpCode, Post, Req, Res, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { RegisterInstitutionDto } from './dto/register-institution.dto.js';
import { LoginDto } from './dto/login.dto.js';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard.js';
import { CurrentUser } from '../common/decorators/current-user.decorator.js';
const REFRESH_COOKIE = 'refresh_token';
const REFRESH_COOKIE_OPTIONS = {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    path: '/auth',
    maxAge: 7 * 24 * 60 * 60 * 1000,
};
let AuthController = class AuthController {
    auth;
    constructor(auth) {
        this.auth = auth;
    }
    registerInstitution(dto) {
        return this.auth.registerInstitution(dto);
    }
    async login(dto, res) {
        const { accessToken, refreshToken, user } = await this.auth.login(dto);
        res.cookie(REFRESH_COOKIE, refreshToken, REFRESH_COOKIE_OPTIONS);
        return { accessToken, user };
    }
    refresh(req, res) {
        const token = req.cookies?.[REFRESH_COOKIE];
        if (!token)
            throw new UnauthorizedException('Thiếu refresh token');
        const { accessToken, refreshToken } = this.auth.refresh(token);
        res.cookie(REFRESH_COOKIE, refreshToken, REFRESH_COOKIE_OPTIONS);
        return { accessToken };
    }
    me(user) {
        return this.auth.me(user);
    }
    logout(res) {
        res.clearCookie(REFRESH_COOKIE, { path: '/auth' });
        return { message: 'Đã đăng xuất' };
    }
};
__decorate([
    Post('register-institution'),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [RegisterInstitutionDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "registerInstitution", null);
__decorate([
    Post('login'),
    HttpCode(200),
    __param(0, Body()),
    __param(1, Res({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [LoginDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    Post('refresh'),
    HttpCode(200),
    __param(0, Req()),
    __param(1, Res({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "refresh", null);
__decorate([
    Get('me'),
    UseGuards(JwtAuthGuard),
    __param(0, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "me", null);
__decorate([
    Post('logout'),
    HttpCode(200),
    __param(0, Res({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "logout", null);
AuthController = __decorate([
    Controller('auth'),
    __metadata("design:paramtypes", [AuthService])
], AuthController);
export { AuthController };
//# sourceMappingURL=auth.controller.js.map