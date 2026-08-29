import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { MaterialsService } from './materials.service.js';
import { CreateMaterialDto } from './dto/create-material.dto.js';
import { ShareMaterialDto } from './dto/share-material.dto.js';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard.js';
import { RolesGuard } from '../common/guards/roles.guard.js';
import { TenantGuard } from '../common/guards/tenant.guard.js';
import { Roles } from '../common/decorators/roles.decorator.js';
import { CurrentUser } from '../common/decorators/current-user.decorator.js';
import { Role } from '../common/enums/role.enum.js';
import type { AuthenticatedUser } from '../common/types/authenticated-user.js';

@Controller('institutions/:institutionId/materials')
@UseGuards(JwtAuthGuard, RolesGuard, TenantGuard)
export class MaterialsController {
  constructor(private readonly materials: MaterialsService) {}

  @Post()
  @Roles(Role.TEACHER)
  create(@Param('institutionId') institutionId: string, @CurrentUser() user: AuthenticatedUser, @Body() dto: CreateMaterialDto) {
    return this.materials.create(institutionId, user.userId, dto);
  }

  @Get()
  list(@Param('institutionId') institutionId: string, @CurrentUser() user: AuthenticatedUser) {
    return this.materials.listVisible(institutionId, user);
  }

  @Patch(':materialId/share')
  @Roles(Role.TEACHER)
  share(@Param('materialId') materialId: string, @CurrentUser() user: AuthenticatedUser, @Body() dto: ShareMaterialDto) {
    return this.materials.share(materialId, user, dto);
  }

  @Patch(':materialId/moderate')
  @Roles(Role.TEACHER)
  moderate(
    @Param('institutionId') institutionId: string,
    @Param('materialId') materialId: string,
    @Query('approve') approve: string,
  ) {
    return this.materials.moderate(materialId, institutionId, approve === 'true');
  }

  @Patch(':materialId/download')
  recordDownload(@Param('institutionId') institutionId: string, @Param('materialId') materialId: string) {
    return this.materials.recordDownload(materialId, institutionId);
  }
}
