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
import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { QuestionBankService } from './question-bank.service.js';
import { CreateQuestionDto } from './dto/create-question.dto.js';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard.js';
import { RolesGuard } from '../common/guards/roles.guard.js';
import { TenantGuard } from '../common/guards/tenant.guard.js';
import { Roles } from '../common/decorators/roles.decorator.js';
import { CurrentUser } from '../common/decorators/current-user.decorator.js';
import { Role } from '../common/enums/role.enum.js';
let QuestionBankController = class QuestionBankController {
    questions;
    constructor(questions) {
        this.questions = questions;
    }
    create(institutionId, user, dto) {
        return this.questions.create(institutionId, user.userId, dto);
    }
    search(institutionId, subject, topic) {
        return this.questions.search(institutionId, { subject, topic });
    }
};
__decorate([
    Post(),
    __param(0, Param('institutionId')),
    __param(1, CurrentUser()),
    __param(2, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, CreateQuestionDto]),
    __metadata("design:returntype", void 0)
], QuestionBankController.prototype, "create", null);
__decorate([
    Get(),
    __param(0, Param('institutionId')),
    __param(1, Query('subject')),
    __param(2, Query('topic')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", void 0)
], QuestionBankController.prototype, "search", null);
QuestionBankController = __decorate([
    Controller('institutions/:institutionId/questions'),
    UseGuards(JwtAuthGuard, RolesGuard, TenantGuard),
    Roles(Role.TEACHER, Role.INSTITUTION_ADMIN),
    __metadata("design:paramtypes", [QuestionBankService])
], QuestionBankController);
export { QuestionBankController };
//# sourceMappingURL=question-bank.controller.js.map