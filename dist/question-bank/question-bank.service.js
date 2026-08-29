var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Question } from './schemas/question.schema.js';
let QuestionBankService = class QuestionBankService {
    questionModel;
    constructor(questionModel) {
        this.questionModel = questionModel;
    }
    create(institutionId, ownerId, dto) {
        return this.questionModel.create({ institutionId, ownerId, ...dto });
    }
    search(institutionId, filters) {
        return this.questionModel
            .find({ institutionId, ...(filters.subject && { subject: filters.subject }), ...(filters.topic && { topic: filters.topic }) })
            .sort({ createdAt: -1 })
            .exec();
    }
    findByIds(ids) {
        return this.questionModel.find({ _id: { $in: ids } }).exec();
    }
};
QuestionBankService = __decorate([
    Injectable(),
    __param(0, InjectModel(Question.name)),
    __metadata("design:paramtypes", [Model])
], QuestionBankService);
export { QuestionBankService };
//# sourceMappingURL=question-bank.service.js.map