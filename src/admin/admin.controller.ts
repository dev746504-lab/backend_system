import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service.js';
import { CreateTeacherDto } from './dto/create-teacher.dto.js';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard.js';
import { AdminGuard } from '../common/guards/admin.guard.js';

@Controller('admin')
@UseGuards(JwtAuthGuard, AdminGuard)
export class AdminController {
  constructor(private readonly admin: AdminService) {}

  @Post('teachers')
  createTeacher(@Body() dto: CreateTeacherDto) {
    return this.admin.createTeacher(dto);
  }

  @Get('teachers')
  listTeachers() {
    return this.admin.listTeachers();
  }

  @Get('classes')
  listAllClasses() {
    return this.admin.listAllClasses();
  }

  @Get('materials/pending')
  listPendingMaterials() {
    return this.admin.listPendingMaterials();
  }

  @Patch('materials/:materialId/moderate')
  moderateMaterial(@Param('materialId') materialId: string, @Query('approve') approve: string) {
    return this.admin.moderateMaterial(materialId, approve === 'true');
  }
}
