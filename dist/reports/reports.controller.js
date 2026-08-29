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
import { Controller, ForbiddenException, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ReportsService } from './reports.service.js';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard.js';
import { RolesGuard } from '../common/guards/roles.guard.js';
import { TenantGuard } from '../common/guards/tenant.guard.js';
import { CurrentUser } from '../common/decorators/current-user.decorator.js';
import { Role } from '../common/enums/role.enum.js';
let ReportsController = class ReportsController {
    reports;
    constructor(reports) {
        this.reports = reports;
    }
    forStudent(studentId, user, classId) {
        if (user.role === Role.STUDENT && user.userId !== studentId) {
            throw new ForbiddenException('Chỉ có thể xem báo cáo của chính mình');
        }
        return this.reports.forStudent(studentId, classId);
    }
    forClass(classId) {
        return this.reports.forClass(classId);
    }
};
__decorate([
    Get('students/:studentId/progress'),
    __param(0, Param('studentId')),
    __param(1, CurrentUser()),
    __param(2, Query('classId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, String]),
    __metadata("design:returntype", void 0)
], ReportsController.prototype, "forStudent", null);
__decorate([
    Get('classes/:classId/progress'),
    __param(0, Param('classId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ReportsController.prototype, "forClass", null);
ReportsController = __decorate([
    Controller(),
    UseGuards(JwtAuthGuard, RolesGuard, TenantGuard),
    __metadata("design:paramtypes", [ReportsService])
], ReportsController);
export { ReportsController };
//# sourceMappingURL=reports.controller.js.map