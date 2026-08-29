import { Controller, ForbiddenException, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ReportsService } from './reports.service.js';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard.js';
import { RolesGuard } from '../common/guards/roles.guard.js';
import { TenantGuard } from '../common/guards/tenant.guard.js';
import { CurrentUser } from '../common/decorators/current-user.decorator.js';
import { Role } from '../common/enums/role.enum.js';
import type { AuthenticatedUser } from '../common/types/authenticated-user.js';

@Controller()
@UseGuards(JwtAuthGuard, RolesGuard, TenantGuard)
export class ReportsController {
  constructor(private readonly reports: ReportsService) {}

  /** Học sinh chỉ xem được tiến độ của chính mình. */
  @Get('students/:studentId/progress')
  forStudent(@Param('studentId') studentId: string, @CurrentUser() user: AuthenticatedUser, @Query('classId') classId?: string) {
    if (user.role === Role.STUDENT && user.userId !== studentId) {
      throw new ForbiddenException('Chỉ có thể xem báo cáo của chính mình');
    }
    return this.reports.forStudent(studentId, classId);
  }

  /** Giáo viên/CSGD xem báo cáo tổng hợp của một lớp. */
  @Get('classes/:classId/progress')
  forClass(@Param('classId') classId: string) {
    return this.reports.forClass(classId);
  }
}
