import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Question, type QuestionDocument } from './schemas/question.schema.js';
import { CreateQuestionDto } from './dto/create-question.dto.js';

@Injectable()
export class QuestionBankService {
  constructor(@InjectModel(Question.name) private readonly questionModel: Model<QuestionDocument>) {}

  create(institutionId: string, ownerId: string, dto: CreateQuestionDto) {
    return this.questionModel.create({ institutionId, ownerId, ...dto });
  }

  search(institutionId: string, filters: { subject?: string; topic?: string }) {
    return this.questionModel
      .find({ institutionId, ...(filters.subject && { subject: filters.subject }), ...(filters.topic && { topic: filters.topic }) })
      .sort({ createdAt: -1 })
      .exec();
  }

  findByIds(ids: string[]) {
    return this.questionModel.find({ _id: { $in: ids } }).exec();
  }
}
