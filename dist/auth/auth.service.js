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
import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as argon2 from 'argon2';
import { UsersService } from '../users/users.service.js';
import { InstitutionsService } from '../institutions/institutions.service.js';
import { MembershipsService } from '../memberships/memberships.service.js';
import { Role } from '../common/enums/role.enum.js';
let AuthService = class AuthService {
    connection;
    users;
    institutions;
    memberships;
    jwt;
    config;
    constructor(connection, users, institutions, memberships, jwt, config) {
        this.connection = connection;
        this.users = users;
        this.institutions = institutions;
        this.memberships = memberships;
        this.jwt = jwt;
        this.config = config;
    }
    async registerInstitution(dto) {
        const existing = await this.users.findByEmail(dto.email);
        if (existing)
            throw new ConflictException('Email đã được sử dụng');
        const session = await this.connection.startSession();
        try {
            let result;
            await session.withTransaction(async () => {
                const passwordHash = await argon2.hash(dto.password);
                const user = await this.users.create({ email: dto.email, passwordHash, fullName: dto.fullName }, session);
                const [institution] = await this.institutions.create({
                    name: dto.institutionName,
                    code: dto.institutionCode,
                    createdBy: user._id,
                    session,
                });
                await this.memberships.create({
                    userId: user._id,
                    institutionId: institution._id,
                    role: Role.INSTITUTION_ADMIN,
                    session,
                });
                result = { userId: String(user._id), institutionId: String(institution._id) };
            });
            return {
                message: 'Đăng ký thành công, đang chờ quản trị hệ thống duyệt',
                ...result,
            };
        }
        finally {
            await session.endSession();
        }
    }
    async login(dto) {
        const user = await this.users.findByEmail(dto.email);
        if (!user)
            throw new UnauthorizedException('Sai email hoặc mật khẩu');
        if (user.status === 'locked')
            throw new UnauthorizedException('Tài khoản đã bị khoá');
        const passwordOk = await argon2.verify(user.passwordHash, dto.password);
        if (!passwordOk)
            throw new UnauthorizedException('Sai email hoặc mật khẩu');
        let role;
        let institutionId = null;
        let membershipId = null;
        if (user.isSystemAdmin) {
            role = Role.SYSTEM_ADMIN;
        }
        else {
            const membership = await this.memberships.findFirstActiveForUser(String(user._id));
            if (!membership)
                throw new UnauthorizedException('Tài khoản chưa thuộc cơ sở giáo dục nào');
            role = membership.role;
            institutionId = String(membership.institutionId);
            membershipId = String(membership._id);
        }
        await this.users.markLoggedIn(String(user._id));
        const authUser = { userId: String(user._id), email: user.email, role, institutionId, membershipId };
        return {
            ...this.issueTokens(authUser),
            user: { id: authUser.userId, email: authUser.email, fullName: user.fullName, role, institutionId },
        };
    }
    issueTokens(authUser) {
        const payload = {
            sub: authUser.userId,
            email: authUser.email,
            role: authUser.role,
            institutionId: authUser.institutionId,
            membershipId: authUser.membershipId,
        };
        const accessToken = this.jwt.sign(payload, {
            secret: this.config.get('JWT_ACCESS_SECRET'),
            expiresIn: '15m',
        });
        const refreshToken = this.jwt.sign(payload, {
            secret: this.config.get('JWT_REFRESH_SECRET'),
            expiresIn: '7d',
        });
        return { accessToken, refreshToken };
    }
    async me(authUser) {
        const user = await this.users.findById(authUser.userId);
        if (!user)
            throw new UnauthorizedException();
        return {
            id: authUser.userId,
            email: user.email,
            fullName: user.fullName,
            role: authUser.role,
            institutionId: authUser.institutionId,
        };
    }
    refresh(refreshToken) {
        try {
            const payload = this.jwt.verify(refreshToken, { secret: this.config.get('JWT_REFRESH_SECRET') });
            const authUser = {
                userId: payload.sub,
                email: payload.email,
                role: payload.role,
                institutionId: payload.institutionId,
                membershipId: payload.membershipId,
            };
            return this.issueTokens(authUser);
        }
        catch {
            throw new UnauthorizedException('Refresh token không hợp lệ hoặc đã hết hạn');
        }
    }
};
AuthService = __decorate([
    Injectable(),
    __param(0, InjectConnection()),
    __metadata("design:paramtypes", [Function, UsersService,
        InstitutionsService,
        MembershipsService,
        JwtService,
        ConfigService])
], AuthService);
export { AuthService };
//# sourceMappingURL=auth.service.js.map