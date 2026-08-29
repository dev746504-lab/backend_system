import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AssignmentsService } from './assignments.service.js';
import { CreateAssignmentDto } from './dto/create-assignment.dto.js';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard.js';
import { RolesGuard } from '../common/guards/roles.guard.js';
import { TenantGuard } from '../common/guards/tenant.guard.js';
import { Roles } from '../common/decorators/roles.decorator.js';
import { CurrentUser } from '../common/decorators/current-user.decorator.js';
import { Role } from '../common/enums/role.enum.js';
import type { AuthenticatedUser } from '../common/types/authenticated-user.js';

@Controller()
@UseGuards(JwtAuthGuard, RolesGuard, TenantGuard)
export class AssignmentsController {
  constructor(private readonly assignments: AssignmentsService) {}

  @Post('classes/:classId/assignments')
  @Roles(Role.TEACHER)
  create(@Param('classId') classId: string, @CurrentUser() teacher: AuthenticatedUser, @Body() dto: CreateAssignmentDto) {
    return this.assignments.create(classId, teacher, dto);
  }

  @Get('classes/:classId/assignments')
  listForClass(@Param('classId') classId: string) {
    return this.assignments.listForClass(classId);
  }

  @Get('assignments/:assignmentId')
  getOne(@Param('assignmentId') assignmentId: string, @CurrentUser() user: AuthenticatedUser) {
    return this.assignments.findByIdForUser(assignmentId, user);
  }
}
