import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import type { Connection } from 'mongoose';
import * as argon2 from 'argon2';
import { UsersService } from '../users/users.service.js';
import { InstitutionsService } from '../institutions/institutions.service.js';
import { MembershipsService } from '../memberships/memberships.service.js';
import { RegisterInstitutionDto } from './dto/register-institution.dto.js';
import { LoginDto } from './dto/login.dto.js';
import { Role } from '../common/enums/role.enum.js';
import type { AuthenticatedUser } from '../common/types/authenticated-user.js';

@Injectable()
export class AuthService {
  constructor(
    @InjectConnection() private readonly connection: Connection,
    private readonly users: UsersService,
    private readonly institutions: InstitutionsService,
    private readonly memberships: MembershipsService,
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
  ) {}

  /**
   * Đăng ký CSGD mới: tạo User + Institution(pending) + Membership(teacher)
   * trong cùng một transaction - nếu bất kỳ bước nào lỗi (VD: code trùng),
   * không để lại user hoặc institution mồ côi. Giáo viên đăng ký là người có
   * toàn quyền quản lý CSGD (không còn vai trò institution_admin riêng).
   */
  async registerInstitution(dto: RegisterInstitutionDto) {
    const existing = await this.users.findByEmail(dto.email);
    if (existing) throw new ConflictException('Email đã được sử dụng');

    const session = await this.connection.startSession();
    try {
      let result!: { userId: string; institutionId: string };
      await session.withTransaction(async () => {
        const passwordHash = await argon2.hash(dto.password);
        const user = await this.users.create({ email: dto.email, passwordHash, fullName: dto.fullName }, session);
        const [institution] = await this.institutions.create({
          name: dto.institutionName,
          code: dto.institutionCode,
          createdBy: user._id,
          session,
        });
        await this.memberships.create({
          userId: user._id,
          institutionId: institution._id,
          role: Role.TEACHER,
          session,
        });
        result = { userId: String(user._id), institutionId: String(institution._id) };
      });
      return {
        message: 'Đăng ký thành công, đang chờ quản trị hệ thống duyệt',
        ...result,
      };
    } finally {
      await session.endSession();
    }
  }

  async login(dto: LoginDto) {
    const user = await this.users.findByEmail(dto.email);
    if (!user) throw new UnauthorizedException('Sai email hoặc mật khẩu');
    if (user.status === 'locked') throw new UnauthorizedException('Tài khoản đã bị khoá');

    const passwordOk = await argon2.verify(user.passwordHash, dto.password);
    if (!passwordOk) throw new UnauthorizedException('Sai email hoặc mật khẩu');

    let role: Role;
    let institutionId: string | null = null;
    let membershipId: string | null = null;

    if (user.isSystemAdmin) {
      role = Role.SYSTEM_ADMIN;
    } else {
      const membership = await this.memberships.findFirstActiveForUser(String(user._id));
      if (!membership) throw new UnauthorizedException('Tài khoản chưa thuộc cơ sở giáo dục nào');
      role = membership.role;
      institutionId = String(membership.institutionId);
      membershipId = String(membership._id);
    }

    await this.users.markLoggedIn(String(user._id));

    const authUser: AuthenticatedUser = { userId: String(user._id), email: user.email, role, institutionId, membershipId };
    return {
      ...this.issueTokens(authUser),
      user: { id: authUser.userId, email: authUser.email, fullName: user.fullName, role, institutionId },
    };
  }

  issueTokens(authUser: AuthenticatedUser) {
    const payload = {
      sub: authUser.userId,
      email: authUser.email,
      role: authUser.role,
      institutionId: authUser.institutionId,
      membershipId: authUser.membershipId,
    };
    const accessToken = this.jwt.sign(payload, {
      secret: this.config.get<string>('JWT_ACCESS_SECRET'),
      expiresIn: '15m',
    });
    const refreshToken = this.jwt.sign(payload, {
      secret: this.config.get<string>('JWT_REFRESH_SECRET'),
      expiresIn: '7d',
    });
    return { accessToken, refreshToken };
  }

  async me(authUser: AuthenticatedUser) {
    const user = await this.users.findById(authUser.userId);
    if (!user) throw new UnauthorizedException();
    return {
      id: authUser.userId,
      email: user.email,
      fullName: user.fullName,
      role: authUser.role,
      institutionId: authUser.institutionId,
    };
  }

  refresh(refreshToken: string) {
    try {
      const payload = this.jwt.verify(refreshToken, { secret: this.config.get<string>('JWT_REFRESH_SECRET') });
      const authUser: AuthenticatedUser = {
        userId: payload.sub,
        email: payload.email,
        role: payload.role,
        institutionId: payload.institutionId,
        membershipId: payload.membershipId,
      };
      return this.issueTokens(authUser);
    } catch {
      throw new UnauthorizedException('Refresh token không hợp lệ hoặc đã hết hạn');
    }
  }
}
