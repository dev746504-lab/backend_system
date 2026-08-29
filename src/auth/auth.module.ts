import { Module } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { AuthController } from './auth.controller.js';
import { UsersModule } from '../users/users.module.js';
import { InstitutionsModule } from '../institutions/institutions.module.js';
import { MembershipsModule } from '../memberships/memberships.module.js';

@Module({
  imports: [UsersModule, InstitutionsModule, MembershipsModule],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
