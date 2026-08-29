import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Question, QuestionSchema } from './schemas/question.schema.js';
import { QuestionBankService } from './question-bank.service.js';
import { QuestionBankController } from './question-bank.controller.js';

@Module({
  imports: [MongooseModule.forFeature([{ name: Question.name, schema: QuestionSchema }])],
  controllers: [QuestionBankController],
  providers: [QuestionBankService],
  exports: [QuestionBankService, MongooseModule],
})
export class QuestionBankModule {}
