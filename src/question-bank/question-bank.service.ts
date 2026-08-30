import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Question, type QuestionDocument } from './schemas/question.schema.js';
import { CreateQuestionDto } from './dto/create-question.dto.js';

@Injectable()
export class QuestionBankService {
  constructor(@InjectModel(Question.name) private readonly questionModel: Model<QuestionDocument>) {}

  create(ownerId: string, dto: CreateQuestionDto) {
    return this.questionModel.create({ ownerId, ...dto });
  }

  search(filters: { subject?: string; topic?: string }) {
    return this.questionModel
      .find({ ...(filters.subject && { subject: filters.subject }), ...(filters.topic && { topic: filters.topic }) })
      .sort({ createdAt: -1 })
      .exec();
  }

  findByIds(ids: string[]) {
    return this.questionModel.find({ _id: { $in: ids } }).exec();
  }
}
