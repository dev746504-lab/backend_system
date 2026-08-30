import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Assignment, AssignmentSchema } from './schemas/assignment.schema.js';
import { ClassMember, ClassMemberSchema } from '../classes/schemas/class-member.schema.js';
import { Submission, SubmissionSchema } from '../submissions/schemas/submission.schema.js';
import { AssignmentsService } from './assignments.service.js';
import { AssignmentsController } from './assignments.controller.js';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Assignment.name, schema: AssignmentSchema },
      { name: ClassMember.name, schema: ClassMemberSchema },
      { name: Submission.name, schema: SubmissionSchema },
    ]),
  ],
  controllers: [AssignmentsController],
  providers: [AssignmentsService],
  exports: [MongooseModule],
})
export class AssignmentsModule {}
