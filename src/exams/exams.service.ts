import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Exam, type ExamDocument } from './schemas/exam.schema.js';
import { CreateExamDto } from './dto/create-exam.dto.js';

@Injectable()
export class ExamsService {
  constructor(@InjectModel(Exam.name) private readonly examModel: Model<ExamDocument>) {}

  /** Mongoose chạy hook pre('validate') để chặn tổng trọng số câu hỏi lệch totalScore. */
  create(institutionId: string, createdBy: string, dto: CreateExamDto) {
    return this.examModel.create({ institutionId, createdBy, ...dto, status: 'draft' });
  }

  async publish(examId: string, institutionId: string) {
    const exam = await this.examModel.findOneAndUpdate(
      { _id: examId, institutionId },
      { status: 'published' },
      { new: true, runValidators: true },
    );
    if (!exam) throw new NotFoundException('Không tìm thấy đề thi');
    return exam;
  }

  findById(examId: string, institutionId: string) {
    return this.examModel.findOne({ _id: examId, institutionId }).populate('questionRefs.questionId').exec();
  }
}
