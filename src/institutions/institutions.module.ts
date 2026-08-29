import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Institution, InstitutionSchema } from './schemas/institution.schema.js';
import { InstitutionsService } from './institutions.service.js';
import { InstitutionsController } from './institutions.controller.js';
import { MembershipsModule } from '../memberships/memberships.module.js';
import { UsersModule } from '../users/users.module.js';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Institution.name, schema: InstitutionSchema }]),
    MembershipsModule,
    UsersModule,
  ],
  controllers: [InstitutionsController],
  providers: [InstitutionsService],
  exports: [InstitutionsService, MongooseModule],
})
export class InstitutionsModule {}
