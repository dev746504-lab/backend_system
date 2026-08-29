import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Membership, MembershipSchema } from './schemas/membership.schema.js';
import { PermissionSet, PermissionSetSchema } from './schemas/permission-set.schema.js';
import { MembershipsService } from './memberships.service.js';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Membership.name, schema: MembershipSchema },
      { name: PermissionSet.name, schema: PermissionSetSchema },
    ]),
  ],
  providers: [MembershipsService],
  exports: [MembershipsService, MongooseModule],
})
export class MembershipsModule {}
