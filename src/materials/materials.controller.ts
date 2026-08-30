import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { MaterialsService } from './materials.service.js';
import { CreateMaterialDto } from './dto/create-material.dto.js';
import { ShareMaterialDto } from './dto/share-material.dto.js';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard.js';
import { RolesGuard } from '../common/guards/roles.guard.js';
import { Roles } from '../common/decorators/roles.decorator.js';
import { CurrentUser } from '../common/decorators/current-user.decorator.js';
import { Role } from '../common/enums/role.enum.js';
import type { AuthenticatedUser } from '../common/types/authenticated-user.js';

@Controller('materials')
@UseGuards(JwtAuthGuard, RolesGuard)
export class MaterialsController {
  constructor(private readonly materials: MaterialsService) {}

  @Post()
  @Roles(Role.TEACHER)
  create(@CurrentUser() user: AuthenticatedUser, @Body() dto: CreateMaterialDto) {
    return this.materials.create(user.userId, dto);
  }

  @Get()
  list(@CurrentUser() user: AuthenticatedUser) {
    return this.materials.listVisible(user);
  }

  @Patch(':materialId/share')
  @Roles(Role.TEACHER)
  share(@Param('materialId') materialId: string, @CurrentUser() user: AuthenticatedUser, @Body() dto: ShareMaterialDto) {
    return this.materials.share(materialId, user, dto);
  }

  @Patch(':materialId/download')
  recordDownload(@Param('materialId') materialId: string) {
    return this.materials.recordDownload(materialId);
  }
}
