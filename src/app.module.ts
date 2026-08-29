import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HealthController } from './health.controller.js';
import { MongooseModule } from '@nestjs/mongoose';
import { ThrottlerModule } from '@nestjs/throttler';
import { AuthModule } from './auth/auth.module.js';
import { GlobalAuthModule } from './auth/global-auth.module.js';
import { UsersModule } from './users/users.module.js';
import { InstitutionsModule } from './institutions/institutions.module.js';
import { MembershipsModule } from './memberships/memberships.module.js';
import { ClassesModule } from './classes/classes.module.js';
import { MaterialsModule } from './materials/materials.module.js';
import { QuestionBankModule } from './question-bank/question-bank.module.js';
import { ExamsModule } from './exams/exams.module.js';
import { AssignmentsModule } from './assignments/assignments.module.js';
import { SubmissionsModule } from './submissions/submissions.module.js';
import { NotificationsModule } from './notifications/notifications.module.js';
import { ReportsModule } from './reports/reports.module.js';
import { AuditModule } from './audit/audit.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ThrottlerModule.forRoot({ throttlers: [{ ttl: 60_000, limit: 100 }] }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        uri: config.getOrThrow<string>('MONGODB_URI'),
      }),
    }),
    GlobalAuthModule,
    AuthModule,
    UsersModule,
    InstitutionsModule,
    MembershipsModule,
    ClassesModule,
    MaterialsModule,
    QuestionBankModule,
    ExamsModule,
    AssignmentsModule,
    SubmissionsModule,
    NotificationsModule,
    ReportsModule,
    AuditModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}
