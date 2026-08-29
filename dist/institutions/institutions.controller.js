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
import { Body, Controller, ForbiddenException, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { randomBytes } from 'node:crypto';
import * as argon2 from 'argon2';
import { InstitutionsService } from './institutions.service.js';
import { MembershipsService } from '../memberships/memberships.service.js';
import { UsersService } from '../users/users.service.js';
import { AddMemberDto } from './dto/add-member.dto.js';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard.js';
import { RolesGuard } from '../common/guards/roles.guard.js';
import { TenantGuard } from '../common/guards/tenant.guard.js';
import { Roles } from '../common/decorators/roles.decorator.js';
import { CurrentUser } from '../common/decorators/current-user.decorator.js';
import { Role } from '../common/enums/role.enum.js';
let InstitutionsController = class InstitutionsController {
    institutions;
    memberships;
    users;
    constructor(institutions, memberships, users) {
        this.institutions = institutions;
        this.memberships = memberships;
        this.users = users;
    }
    listPending() {
        return this.institutions.listPending();
    }
    approve(id, admin) {
        return this.institutions.approve(id, admin.userId);
    }
    suspend(id) {
        return this.institutions.suspend(id);
    }
    getOne(id) {
        return this.institutions.findById(id);
    }
    listMembers(institutionId) {
        return this.memberships.listForInstitution(institutionId);
    }
    async addMember(institutionId, dto) {
        const institution = await this.institutions.findById(institutionId);
        if (institution?.status !== 'active') {
            throw new ForbiddenException('CSGD cần được hệ thống duyệt trước khi thêm thành viên');
        }
        let user = await this.users.findByEmail(dto.email);
        if (!user) {
            const tempPassword = randomBytes(9).toString('base64url');
            const passwordHash = await argon2.hash(tempPassword);
            user = await this.users.create({ email: dto.email, passwordHash, fullName: dto.fullName });
        }
        await this.memberships.create({ userId: user._id, institutionId, role: dto.role });
        return { userId: user._id, email: user.email, role: dto.role };
    }
};
__decorate([
    Get('pending'),
    Roles(Role.SYSTEM_ADMIN),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], InstitutionsController.prototype, "listPending", null);
__decorate([
    Patch(':id/approve'),
    Roles(Role.SYSTEM_ADMIN),
    __param(0, Param('id')),
    __param(1, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], InstitutionsController.prototype, "approve", null);
__decorate([
    Patch(':id/suspend'),
    Roles(Role.SYSTEM_ADMIN),
    __param(0, Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], InstitutionsController.prototype, "suspend", null);
__decorate([
    Get(':institutionId'),
    __param(0, Param('institutionId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], InstitutionsController.prototype, "getOne", null);
__decorate([
    Get(':institutionId/members'),
    Roles(Role.INSTITUTION_ADMIN),
    __param(0, Param('institutionId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], InstitutionsController.prototype, "listMembers", null);
__decorate([
    Post(':institutionId/members'),
    Roles(Role.INSTITUTION_ADMIN),
    __param(0, Param('institutionId')),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, AddMemberDto]),
    __metadata("design:returntype", Promise)
], InstitutionsController.prototype, "addMember", null);
InstitutionsController = __decorate([
    Controller('institutions'),
    UseGuards(JwtAuthGuard, RolesGuard, TenantGuard),
    __metadata("design:paramtypes", [InstitutionsService,
        MembershipsService,
        UsersService])
], InstitutionsController);
export { InstitutionsController };
//# sourceMappingURL=institutions.controller.js.map