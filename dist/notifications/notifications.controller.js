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
import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { NotificationsService } from './notifications.service.js';
import { SendNotificationDto } from './dto/send-notification.dto.js';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard.js';
import { RolesGuard } from '../common/guards/roles.guard.js';
import { TenantGuard } from '../common/guards/tenant.guard.js';
import { Roles } from '../common/decorators/roles.decorator.js';
import { CurrentUser } from '../common/decorators/current-user.decorator.js';
import { Role } from '../common/enums/role.enum.js';
let NotificationsController = class NotificationsController {
    notifications;
    constructor(notifications) {
        this.notifications = notifications;
    }
    send(sender, dto) {
        return this.notifications.send(sender, dto);
    }
    list(user) {
        return this.notifications.listForUser(user);
    }
    markRead(id, user) {
        return this.notifications.markRead(id, user.userId);
    }
};
__decorate([
    Post(),
    Roles(Role.INSTITUTION_ADMIN, Role.TEACHER),
    __param(0, CurrentUser()),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, SendNotificationDto]),
    __metadata("design:returntype", void 0)
], NotificationsController.prototype, "send", null);
__decorate([
    Get(),
    __param(0, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], NotificationsController.prototype, "list", null);
__decorate([
    Patch(':id/read'),
    __param(0, Param('id')),
    __param(1, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], NotificationsController.prototype, "markRead", null);
NotificationsController = __decorate([
    Controller('notifications'),
    UseGuards(JwtAuthGuard, RolesGuard, TenantGuard),
    __metadata("design:paramtypes", [NotificationsService])
], NotificationsController);
export { NotificationsController };
//# sourceMappingURL=notifications.controller.js.map