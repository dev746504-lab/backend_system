var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
let MaterialsController = class MaterialsController {
    materials;
    constructor(materials) {
        this.materials = materials;
    }
    create(institutionId, user, dto) {
        return this.materials.create(institutionId, user.userId, dto);
    }
    list(institutionId, user) {
        return this.materials.listVisible(institutionId, user);
    }
    share(materialId, user, dto) {
        return this.materials.share(materialId, user, dto);
    }
    moderate(institutionId, materialId, approve) {
        return this.materials.moderate(materialId, institutionId, approve === 'true');
    }
    recordDownload(institutionId, materialId) {
        return this.materials.recordDownload(materialId, institutionId);
    }
};
__decorate([
    Post(),
    Roles(Role.TEACHER, Role.INSTITUTION_ADMIN),
    __param(0, Param('institutionId')),
    __param(1, CurrentUser()),
    __param(2, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, CreateMaterialDto]),
    __metadata("design:returntype", void 0)
], MaterialsController.prototype, "create", null);
__decorate([
    Get(),
    __param(0, Param('institutionId')),
    __param(1, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], MaterialsController.prototype, "list", null);
__decorate([
    Patch(':materialId/share'),
    Roles(Role.TEACHER, Role.INSTITUTION_ADMIN),
    __param(0, Param('materialId')),
    __param(1, CurrentUser()),
    __param(2, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, ShareMaterialDto]),
    __metadata("design:returntype", void 0)
], MaterialsController.prototype, "share", null);
__decorate([
    Patch(':materialId/moderate'),
    Roles(Role.INSTITUTION_ADMIN),
    __param(0, Param('institutionId')),
    __param(1, Param('materialId')),
    __param(2, Query('approve')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", void 0)
], MaterialsController.prototype, "moderate", null);
__decorate([
    Patch(':materialId/download'),
    __param(0, Param('institutionId')),
    __param(1, Param('materialId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], MaterialsController.prototype, "recordDownload", null);
MaterialsController = __decorate([
    Controller('institutions/:institutionId/materials'),
    UseGuards(JwtAuthGuard, RolesGuard, TenantGuard),
    __metadata("design:paramtypes", [MaterialsService])
], MaterialsController);
export { MaterialsController };
//# sourceMappingURL=materials.controller.js.map