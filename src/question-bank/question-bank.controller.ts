import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { QuestionBankService } from './question-bank.service.js';
import { CreateQuestionDto } from './dto/create-question.dto.js';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard.js';
import { RolesGuard } from '../common/guards/roles.guard.js';
import { Roles } from '../common/decorators/roles.decorator.js';
import { CurrentUser } from '../common/decorators/current-user.decorator.js';
import { Role } from '../common/enums/role.enum.js';
import type { AuthenticatedUser } from '../common/types/authenticated-user.js';

@Controller('questions')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.TEACHER)
export class QuestionBankController {
  constructor(private readonly questions: QuestionBankService) {}

  @Post()
  create(@CurrentUser() user: AuthenticatedUser, @Body() dto: CreateQuestionDto) {
    return this.questions.create(user.userId, dto);
  }

  @Get()
  search(@Query('subject') subject?: string, @Query('topic') topic?: string) {
    return this.questions.search({ subject, topic });
  }
}
