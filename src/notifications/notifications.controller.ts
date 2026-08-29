import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { NotificationsService } from './notifications.service.js';
import { SendNotificationDto } from './dto/send-notification.dto.js';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard.js';
import { RolesGuard } from '../common/guards/roles.guard.js';
import { TenantGuard } from '../common/guards/tenant.guard.js';
import { Roles } from '../common/decorators/roles.decorator.js';
import { CurrentUser } from '../common/decorators/current-user.decorator.js';
import { Role } from '../common/enums/role.enum.js';
import type { AuthenticatedUser } from '../common/types/authenticated-user.js';

@Controller('notifications')
@UseGuards(JwtAuthGuard, RolesGuard, TenantGuard)
export class NotificationsController {
  constructor(private readonly notifications: NotificationsService) {}

  @Post()
  @Roles(Role.INSTITUTION_ADMIN, Role.TEACHER)
  send(@CurrentUser() sender: AuthenticatedUser, @Body() dto: SendNotificationDto) {
    return this.notifications.send(sender, dto);
  }

  @Get()
  list(@CurrentUser() user: AuthenticatedUser) {
    return this.notifications.listForUser(user);
  }

  @Patch(':id/read')
  markRead(@Param('id') id: string, @CurrentUser() user: AuthenticatedUser) {
    return this.notifications.markRead(id, user.userId);
  }
}
