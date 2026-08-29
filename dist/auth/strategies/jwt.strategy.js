var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { ExtractJwt, Strategy } from 'passport-jwt';
let JwtStrategy = class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(config) {
        const secret = config.get('JWT_ACCESS_SECRET');
        if (!secret)
            throw new Error('JWT_ACCESS_SECRET chưa được cấu hình');
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: secret,
        });
    }
    validate(payload) {
        if (!payload.sub)
            throw new UnauthorizedException();
        return {
            userId: payload.sub,
            email: payload.email,
            role: payload.role,
            institutionId: payload.institutionId,
            membershipId: payload.membershipId,
        };
    }
};
JwtStrategy = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [ConfigService])
], JwtStrategy);
export { JwtStrategy };
//# sourceMappingURL=jwt.strategy.js.map