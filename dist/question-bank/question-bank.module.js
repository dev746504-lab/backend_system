var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Question, QuestionSchema } from './schemas/question.schema.js';
import { QuestionBankService } from './question-bank.service.js';
import { QuestionBankController } from './question-bank.controller.js';
let QuestionBankModule = class QuestionBankModule {
};
QuestionBankModule = __decorate([
    Module({
        imports: [MongooseModule.forFeature([{ name: Question.name, schema: QuestionSchema }])],
        controllers: [QuestionBankController],
        providers: [QuestionBankService],
        exports: [QuestionBankService, MongooseModule],
    })
], QuestionBankModule);
export { QuestionBankModule };
//# sourceMappingURL=question-bank.module.js.map