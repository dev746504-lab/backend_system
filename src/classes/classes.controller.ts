import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ClassesService } from './classes.service.js';
import { CreateClassDto } from './dto/create-class.dto.js';
import { AddClassMemberDto } from './dto/add-class-member.dto.js';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard.js';
import { RolesGuard } from '../common/guards/roles.guard.js';
import { Roles } from '../common/decorators/roles.decorator.js';
import { CurrentUser } from '../common/decorators/current-user.decorator.js';
import { Role } from '../common/enums/role.enum.js';
import type { AuthenticatedUser } from '../common/types/authenticated-user.js';

@Controller('classes')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ClassesController {
  constructor(private readonly classes: ClassesService) {}

  @Post()
  @Roles(Role.TEACHER)
  create(@CurrentUser() teacher: AuthenticatedUser, @Body() dto: CreateClassDto) {
    return this.classes.create(teacher.userId, dto);
  }

  @Get()
  list(@CurrentUser() user: AuthenticatedUser) {
    return this.classes.listForUser(user);
  }

  @Get(':classId')
  getOne(@Param('classId') classId: string, @CurrentUser() user: AuthenticatedUser) {
    return this.classes.findByIdForUser(classId, user);
  }

  @Post(':classId/members')
  @Roles(Role.TEACHER)
  addMember(@Param('classId') classId: string, @CurrentUser() teacher: AuthenticatedUser, @Body() dto: AddClassMemberDto) {
    return this.classes.addMemberByEmail(classId, teacher, dto);
  }

  @Get(':classId/members')
  listMembers(@Param('classId') classId: string) {
    return this.classes.listMembers(classId);
  }
}
