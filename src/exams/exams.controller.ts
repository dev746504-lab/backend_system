import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ExamsService } from './exams.service.js';
import { CreateExamDto } from './dto/create-exam.dto.js';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard.js';
import { RolesGuard } from '../common/guards/roles.guard.js';
import { TenantGuard } from '../common/guards/tenant.guard.js';
import { Roles } from '../common/decorators/roles.decorator.js';
import { CurrentUser } from '../common/decorators/current-user.decorator.js';
import { Role } from '../common/enums/role.enum.js';
import type { AuthenticatedUser } from '../common/types/authenticated-user.js';

@Controller('institutions/:institutionId/exams')
@UseGuards(JwtAuthGuard, RolesGuard, TenantGuard)
export class ExamsController {
  constructor(private readonly exams: ExamsService) {}

  @Post()
  @Roles(Role.TEACHER)
  create(@Param('institutionId') institutionId: string, @CurrentUser() user: AuthenticatedUser, @Body() dto: CreateExamDto) {
    return this.exams.create(institutionId, user.userId, dto);
  }

  @Patch(':examId/publish')
  @Roles(Role.TEACHER)
  publish(@Param('institutionId') institutionId: string, @Param('examId') examId: string) {
    return this.exams.publish(examId, institutionId);
  }

  @Get(':examId')
  getOne(@Param('institutionId') institutionId: string, @Param('examId') examId: string) {
    return this.exams.findById(examId, institutionId);
  }
}
