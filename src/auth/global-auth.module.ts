import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy.js';

/**
 * JwtAuthGuard/RolesGuard/TenantGuard are applied via @UseGuards() on
 * controllers across every feature module (ClassesModule, MaterialsModule, ...),
 * not just AuthModule. Nest resolves a guard's dependencies in the module that
 * declares the controller, so the Passport/JWT machinery must be global —
 * otherwise every feature module would need to re-import PassportModule itself.
 */
@Global()
@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' }), JwtModule.register({})],
  providers: [JwtStrategy],
  exports: [PassportModule, JwtModule],
})
export class GlobalAuthModule {}
