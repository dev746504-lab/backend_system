import { Body, Controller, ForbiddenException, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { randomBytes } from 'node:crypto';
import * as argon2 from 'argon2';
import { InstitutionsService } from './institutions.service.js';
import { MembershipsService } from '../memberships/memberships.service.js';
import { UsersService } from '../users/users.service.js';
import { AddMemberDto } from './dto/add-member.dto.js';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard.js';
import { RolesGuard } from '../common/guards/roles.guard.js';
import { TenantGuard } from '../common/guards/tenant.guard.js';
import { Roles } from '../common/decorators/roles.decorator.js';
import { CurrentUser } from '../common/decorators/current-user.decorator.js';
import { Role } from '../common/enums/role.enum.js';
import type { AuthenticatedUser } from '../common/types/authenticated-user.js';

@Controller('institutions')
@UseGuards(JwtAuthGuard, RolesGuard, TenantGuard)
export class InstitutionsController {
  constructor(
    private readonly institutions: InstitutionsService,
    private readonly memberships: MembershipsService,
    private readonly users: UsersService,
  ) {}

  @Get('pending')
  @Roles(Role.SYSTEM_ADMIN)
  listPending() {
    return this.institutions.listPending();
  }

  @Patch(':id/approve')
  @Roles(Role.SYSTEM_ADMIN)
  approve(@Param('id') id: string, @CurrentUser() admin: AuthenticatedUser) {
    return this.institutions.approve(id, admin.userId);
  }

  @Patch(':id/suspend')
  @Roles(Role.SYSTEM_ADMIN)
  suspend(@Param('id') id: string) {
    return this.institutions.suspend(id);
  }

  @Get(':institutionId')
  getOne(@Param('institutionId') id: string) {
    return this.institutions.findById(id);
  }

  @Get(':institutionId/members')
  @Roles(Role.TEACHER)
  listMembers(@Param('institutionId') institutionId: string) {
    return this.memberships.listForInstitution(institutionId);
  }

  /**
   * Giáo viên (vai trò cao nhất trong CSGD) thêm thành viên (giáo viên khác/học sinh)
   * và gán vai trò. Nếu email chưa tồn tại tài khoản, tạo user mới với mật khẩu tạm -
   * trong triển khai thật cần thay bằng luồng email mời + đặt mật khẩu qua token.
   */
  @Post(':institutionId/members')
  @Roles(Role.TEACHER)
  async addMember(@Param('institutionId') institutionId: string, @Body() dto: AddMemberDto) {
    const institution = await this.institutions.findById(institutionId);
    if (institution?.status !== 'active') {
      throw new ForbiddenException('CSGD cần được hệ thống duyệt trước khi thêm thành viên');
    }

    let user = await this.users.findByEmail(dto.email);
    let tempPassword: string | undefined;
    if (!user) {
      tempPassword = randomBytes(9).toString('base64url');
      const passwordHash = await argon2.hash(tempPassword);
      user = await this.users.create({ email: dto.email, passwordHash, fullName: dto.fullName });
    }
    await this.memberships.create({ userId: user._id, institutionId, role: dto.role });
    // tempPassword chỉ có khi vừa tạo tài khoản mới - trả về một lần duy nhất để
    // giáo viên gửi lại cho thành viên (chưa có luồng mời qua email/token thật).
    return { userId: user._id, email: user.email, role: dto.role, tempPassword };
  }
}
