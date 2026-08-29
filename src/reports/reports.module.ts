import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentProgress, StudentProgressSchema } from './schemas/student-progress.schema.js';
import { Submission, SubmissionSchema } from '../submissions/schemas/submission.schema.js';
import { Assignment, AssignmentSchema } from '../assignments/schemas/assignment.schema.js';
import { Class, ClassSchema } from '../classes/schemas/class.schema.js';
import { ReportsService } from './reports.service.js';
import { ReportsController } from './reports.controller.js';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: StudentProgress.name, schema: StudentProgressSchema },
      { name: Submission.name, schema: SubmissionSchema },
      { name: Assignment.name, schema: AssignmentSchema },
      { name: Class.name, schema: ClassSchema },
    ]),
  ],
  controllers: [ReportsController],
  providers: [ReportsService],
  exports: [ReportsService, MongooseModule],
})
export class ReportsModule {}
