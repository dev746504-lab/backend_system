import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AssignmentsService } from './assignments.service.js';
import { CreateAssignmentDto } from './dto/create-assignment.dto.js';
import { UpdateAssignmentDto } from './dto/update-assignment.dto.js';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard.js';
import { RolesGuard } from '../common/guards/roles.guard.js';
import { Roles } from '../common/decorators/roles.decorator.js';
import { CurrentUser } from '../common/decorators/current-user.decorator.js';
import { Role } from '../common/enums/role.enum.js';
import type { AuthenticatedUser } from '../common/types/authenticated-user.js';

@Controller()
@UseGuards(JwtAuthGuard, RolesGuard)
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

  @Patch('assignments/:assignmentId')
  @Roles(Role.TEACHER)
  update(@Param('assignmentId') assignmentId: string, @CurrentUser() teacher: AuthenticatedUser, @Body() dto: UpdateAssignmentDto) {
    return this.assignments.update(assignmentId, teacher, dto);
  }

  @Delete('assignments/:assignmentId')
  @Roles(Role.TEACHER)
  @HttpCode(204)
  remove(@Param('assignmentId') assignmentId: string, @CurrentUser() teacher: AuthenticatedUser) {
    return this.assignments.remove(assignmentId, teacher);
  }
}
