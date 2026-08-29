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
import { SubmissionsService } from './submissions.service.js';
import { SubmitAssignmentDto } from './dto/submit-assignment.dto.js';
import { GradeSubmissionDto } from './dto/grade-submission.dto.js';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard.js';
import { RolesGuard } from '../common/guards/roles.guard.js';
import { TenantGuard } from '../common/guards/tenant.guard.js';
import { Roles } from '../common/decorators/roles.decorator.js';
import { CurrentUser } from '../common/decorators/current-user.decorator.js';
import { Role } from '../common/enums/role.enum.js';
let SubmissionsController = class SubmissionsController {
    submissions;
    constructor(submissions) {
        this.submissions = submissions;
    }
    submit(assignmentId, student, dto) {
        return this.submissions.submit(assignmentId, student, dto);
    }
    listForAssignment(assignmentId) {
        return this.submissions.listForAssignment(assignmentId);
    }
    findMine(assignmentId, student) {
        return this.submissions.findMine(assignmentId, student.userId);
    }
    grade(submissionId, teacher, dto) {
        return this.submissions.grade(submissionId, teacher, dto);
    }
};
__decorate([
    Post('assignments/:assignmentId/submissions'),
    Roles(Role.STUDENT),
    __param(0, Param('assignmentId')),
    __param(1, CurrentUser()),
    __param(2, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, SubmitAssignmentDto]),
    __metadata("design:returntype", void 0)
], SubmissionsController.prototype, "submit", null);
__decorate([
    Get('assignments/:assignmentId/submissions'),
    Roles(Role.TEACHER, Role.INSTITUTION_ADMIN),
    __param(0, Param('assignmentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SubmissionsController.prototype, "listForAssignment", null);
__decorate([
    Get('assignments/:assignmentId/my-submission'),
    Roles(Role.STUDENT),
    __param(0, Param('assignmentId')),
    __param(1, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], SubmissionsController.prototype, "findMine", null);
__decorate([
    Patch('submissions/:submissionId/grade'),
    Roles(Role.TEACHER),
    __param(0, Param('submissionId')),
    __param(1, CurrentUser()),
    __param(2, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, GradeSubmissionDto]),
    __metadata("design:returntype", void 0)
], SubmissionsController.prototype, "grade", null);
SubmissionsController = __decorate([
    Controller(),
    UseGuards(JwtAuthGuard, RolesGuard, TenantGuard),
    __metadata("design:paramtypes", [SubmissionsService])
], SubmissionsController);
export { SubmissionsController };
//# sourceMappingURL=submissions.controller.js.map