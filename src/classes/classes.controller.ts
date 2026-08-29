import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ClassesService } from './classes.service.js';
import { CreateClassDto } from './dto/create-class.dto.js';
import { AddClassMemberDto } from './dto/add-class-member.dto.js';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard.js';
import { RolesGuard } from '../common/guards/roles.guard.js';
import { TenantGuard } from '../common/guards/tenant.guard.js';
import { Roles } from '../common/decorators/roles.decorator.js';
import { CurrentUser } from '../common/decorators/current-user.decorator.js';
import { Role } from '../common/enums/role.enum.js';
import type { AuthenticatedUser } from '../common/types/authenticated-user.js';

@Controller()
@UseGuards(JwtAuthGuard, RolesGuard, TenantGuard)
export class ClassesController {
  constructor(private readonly classes: ClassesService) {}

  @Post('institutions/:institutionId/classes')
  @Roles(Role.INSTITUTION_ADMIN)
  create(@Param('institutionId') institutionId: string, @Body() dto: CreateClassDto) {
    return this.classes.create(institutionId, dto);
  }

  @Get('institutions/:institutionId/classes')
  list(@Param('institutionId') institutionId: string, @CurrentUser() user: AuthenticatedUser) {
    return this.classes.listForUser(institutionId, user);
  }

  @Get('classes/:classId')
  getOne(@Param('classId') classId: string, @CurrentUser() user: AuthenticatedUser) {
    return this.classes.findByIdForUser(classId, user);
  }

  @Post('classes/:classId/members')
  @Roles(Role.INSTITUTION_ADMIN)
  addMember(@Param('classId') classId: string, @CurrentUser() user: AuthenticatedUser, @Body() dto: AddClassMemberDto) {
    return this.classes.addMember(classId, user.institutionId!, dto);
  }

  @Get('classes/:classId/members')
  listMembers(@Param('classId') classId: string) {
    return this.classes.listMembers(classId);
  }
}
