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
import { AssignmentsService } from './assignments.service.js';
import { CreateAssignmentDto } from './dto/create-assignment.dto.js';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard.js';
import { RolesGuard } from '../common/guards/roles.guard.js';
import { TenantGuard } from '../common/guards/tenant.guard.js';
import { Roles } from '../common/decorators/roles.decorator.js';
import { CurrentUser } from '../common/decorators/current-user.decorator.js';
import { Role } from '../common/enums/role.enum.js';
let AssignmentsController = class AssignmentsController {
    assignments;
    constructor(assignments) {
        this.assignments = assignments;
    }
    create(classId, teacher, dto) {
        return this.assignments.create(classId, teacher, dto);
    }
    listForClass(classId) {
        return this.assignments.listForClass(classId);
    }
    getOne(assignmentId, user) {
        return this.assignments.findByIdForUser(assignmentId, user);
    }
};
__decorate([
    Post('classes/:classId/assignments'),
    Roles(Role.TEACHER),
    __param(0, Param('classId')),
    __param(1, CurrentUser()),
    __param(2, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, CreateAssignmentDto]),
    __metadata("design:returntype", void 0)
], AssignmentsController.prototype, "create", null);
__decorate([
    Get('classes/:classId/assignments'),
    __param(0, Param('classId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AssignmentsController.prototype, "listForClass", null);
__decorate([
    Get('assignments/:assignmentId'),
    __param(0, Param('assignmentId')),
    __param(1, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], AssignmentsController.prototype, "getOne", null);
AssignmentsController = __decorate([
    Controller(),
    UseGuards(JwtAuthGuard, RolesGuard, TenantGuard),
    __metadata("design:paramtypes", [AssignmentsService])
], AssignmentsController);
export { AssignmentsController };
//# sourceMappingURL=assignments.controller.js.map