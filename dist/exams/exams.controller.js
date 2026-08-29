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
import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ExamsService } from './exams.service.js';
import { CreateExamDto } from './dto/create-exam.dto.js';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard.js';
import { RolesGuard } from '../common/guards/roles.guard.js';
import { TenantGuard } from '../common/guards/tenant.guard.js';
import { Roles } from '../common/decorators/roles.decorator.js';
import { CurrentUser } from '../common/decorators/current-user.decorator.js';
import { Role } from '../common/enums/role.enum.js';
let ExamsController = class ExamsController {
    exams;
    constructor(exams) {
        this.exams = exams;
    }
    create(institutionId, user, dto) {
        return this.exams.create(institutionId, user.userId, dto);
    }
    publish(institutionId, examId) {
        return this.exams.publish(examId, institutionId);
    }
    getOne(institutionId, examId) {
        return this.exams.findById(examId, institutionId);
    }
};
__decorate([
    Post(),
    Roles(Role.TEACHER, Role.INSTITUTION_ADMIN),
    __param(0, Param('institutionId')),
    __param(1, CurrentUser()),
    __param(2, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, CreateExamDto]),
    __metadata("design:returntype", void 0)
], ExamsController.prototype, "create", null);
__decorate([
    Patch(':examId/publish'),
    Roles(Role.TEACHER, Role.INSTITUTION_ADMIN),
    __param(0, Param('institutionId')),
    __param(1, Param('examId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], ExamsController.prototype, "publish", null);
__decorate([
    Get(':examId'),
    __param(0, Param('institutionId')),
    __param(1, Param('examId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], ExamsController.prototype, "getOne", null);
ExamsController = __decorate([
    Controller('institutions/:institutionId/exams'),
    UseGuards(JwtAuthGuard, RolesGuard, TenantGuard),
    __metadata("design:paramtypes", [ExamsService])
], ExamsController);
export { ExamsController };
//# sourceMappingURL=exams.controller.js.map