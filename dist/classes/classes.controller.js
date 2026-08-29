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
import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ClassesService } from './classes.service.js';
import { CreateClassDto } from './dto/create-class.dto.js';
import { AddClassMemberDto } from './dto/add-class-member.dto.js';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard.js';
import { RolesGuard } from '../common/guards/roles.guard.js';
import { TenantGuard } from '../common/guards/tenant.guard.js';
import { Roles } from '../common/decorators/roles.decorator.js';
import { CurrentUser } from '../common/decorators/current-user.decorator.js';
import { Role } from '../common/enums/role.enum.js';
let ClassesController = class ClassesController {
    classes;
    constructor(classes) {
        this.classes = classes;
    }
    create(institutionId, dto) {
        return this.classes.create(institutionId, dto);
    }
    list(institutionId, user) {
        return this.classes.listForUser(institutionId, user);
    }
    getOne(classId, user) {
        return this.classes.findByIdForUser(classId, user);
    }
    addMember(classId, user, dto) {
        return this.classes.addMember(classId, user.institutionId, dto);
    }
    listMembers(classId) {
        return this.classes.listMembers(classId);
    }
};
__decorate([
    Post('institutions/:institutionId/classes'),
    Roles(Role.INSTITUTION_ADMIN),
    __param(0, Param('institutionId')),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, CreateClassDto]),
    __metadata("design:returntype", void 0)
], ClassesController.prototype, "create", null);
__decorate([
    Get('institutions/:institutionId/classes'),
    __param(0, Param('institutionId')),
    __param(1, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ClassesController.prototype, "list", null);
__decorate([
    Get('classes/:classId'),
    __param(0, Param('classId')),
    __param(1, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ClassesController.prototype, "getOne", null);
__decorate([
    Post('classes/:classId/members'),
    Roles(Role.INSTITUTION_ADMIN),
    __param(0, Param('classId')),
    __param(1, CurrentUser()),
    __param(2, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, AddClassMemberDto]),
    __metadata("design:returntype", void 0)
], ClassesController.prototype, "addMember", null);
__decorate([
    Get('classes/:classId/members'),
    __param(0, Param('classId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ClassesController.prototype, "listMembers", null);
ClassesController = __decorate([
    Controller(),
    UseGuards(JwtAuthGuard, RolesGuard, TenantGuard),
    __metadata("design:paramtypes", [ClassesService])
], ClassesController);
export { ClassesController };
//# sourceMappingURL=classes.controller.js.map