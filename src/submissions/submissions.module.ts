import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Submission, SubmissionSchema } from './schemas/submission.schema.js';
import { Assignment, AssignmentSchema } from '../assignments/schemas/assignment.schema.js';
import { ClassMember, ClassMemberSchema } from '../classes/schemas/class-member.schema.js';
import { SubmissionsService } from './submissions.service.js';
import { SubmissionsController } from './submissions.controller.js';
import { ReportsModule } from '../reports/reports.module.js';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Submission.name, schema: SubmissionSchema },
      { name: Assignment.name, schema: AssignmentSchema },
      { name: ClassMember.name, schema: ClassMemberSchema },
    ]),
    ReportsModule,
  ],
  controllers: [SubmissionsController],
  providers: [SubmissionsService],
  exports: [MongooseModule],
})
export class SubmissionsModule {}
