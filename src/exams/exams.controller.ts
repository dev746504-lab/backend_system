import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ExamsService } from './exams.service.js';
import { CreateExamDto } from './dto/create-exam.dto.js';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard.js';
import { RolesGuard } from '../common/guards/roles.guard.js';
import { Roles } from '../common/decorators/roles.decorator.js';
import { CurrentUser } from '../common/decorators/current-user.decorator.js';
import { Role } from '../common/enums/role.enum.js';
import type { AuthenticatedUser } from '../common/types/authenticated-user.js';

@Controller('exams')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ExamsController {
  constructor(private readonly exams: ExamsService) {}

  @Post()
  @Roles(Role.TEACHER)
  create(@CurrentUser() user: AuthenticatedUser, @Body() dto: CreateExamDto) {
    return this.exams.create(user.userId, dto);
  }

  @Patch(':examId/publish')
  @Roles(Role.TEACHER)
  publish(@Param('examId') examId: string) {
    return this.exams.publish(examId);
  }

  @Get(':examId')
  getOne(@Param('examId') examId: string) {
    return this.exams.findById(examId);
  }
}
