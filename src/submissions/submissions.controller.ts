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
import type { AuthenticatedUser } from '../common/types/authenticated-user.js';

@Controller()
@UseGuards(JwtAuthGuard, RolesGuard, TenantGuard)
export class SubmissionsController {
  constructor(private readonly submissions: SubmissionsService) {}

  @Post('assignments/:assignmentId/submissions')
  @Roles(Role.STUDENT)
  submit(@Param('assignmentId') assignmentId: string, @CurrentUser() student: AuthenticatedUser, @Body() dto: SubmitAssignmentDto) {
    return this.submissions.submit(assignmentId, student, dto);
  }

  @Get('assignments/:assignmentId/submissions')
  @Roles(Role.TEACHER)
  listForAssignment(@Param('assignmentId') assignmentId: string) {
    return this.submissions.listForAssignment(assignmentId);
  }

  @Get('assignments/:assignmentId/my-submission')
  @Roles(Role.STUDENT)
  findMine(@Param('assignmentId') assignmentId: string, @CurrentUser() student: AuthenticatedUser) {
    return this.submissions.findMine(assignmentId, student.userId);
  }

  @Patch('submissions/:submissionId/grade')
  @Roles(Role.TEACHER)
  grade(@Param('submissionId') submissionId: string, @CurrentUser() teacher: AuthenticatedUser, @Body() dto: GradeSubmissionDto) {
    return this.submissions.grade(submissionId, teacher, dto);
  }
}
