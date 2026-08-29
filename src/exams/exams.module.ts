import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Exam, ExamSchema } from './schemas/exam.schema.js';
import { ExamsService } from './exams.service.js';
import { ExamsController } from './exams.controller.js';

@Module({
  imports: [MongooseModule.forFeature([{ name: Exam.name, schema: ExamSchema }])],
  controllers: [ExamsController],
  providers: [ExamsService],
  exports: [MongooseModule],
})
export class ExamsModule {}
