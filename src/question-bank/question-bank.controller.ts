import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { QuestionBankService } from './question-bank.service.js';
import { CreateQuestionDto } from './dto/create-question.dto.js';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard.js';
import { RolesGuard } from '../common/guards/roles.guard.js';
import { TenantGuard } from '../common/guards/tenant.guard.js';
import { Roles } from '../common/decorators/roles.decorator.js';
import { CurrentUser } from '../common/decorators/current-user.decorator.js';
import { Role } from '../common/enums/role.enum.js';
import type { AuthenticatedUser } from '../common/types/authenticated-user.js';

@Controller('institutions/:institutionId/questions')
@UseGuards(JwtAuthGuard, RolesGuard, TenantGuard)
@Roles(Role.TEACHER)
export class QuestionBankController {
  constructor(private readonly questions: QuestionBankService) {}

  @Post()
  create(@Param('institutionId') institutionId: string, @CurrentUser() user: AuthenticatedUser, @Body() dto: CreateQuestionDto) {
    return this.questions.create(institutionId, user.userId, dto);
  }

  @Get()
  search(@Param('institutionId') institutionId: string, @Query('subject') subject?: string, @Query('topic') topic?: string) {
    return this.questions.search(institutionId, { subject, topic });
  }
}
