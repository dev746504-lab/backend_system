var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ArrayMaxSize, IsArray, IsEnum, IsOptional, IsString, MaxLength } from 'class-validator';
export class CreateQuestionDto {
    subject;
    topic;
    type;
    content;
    options;
    correctAnswer;
    difficulty;
    tags;
}
__decorate([
    IsOptional(),
    IsString(),
    MaxLength(80),
    __metadata("design:type", String)
], CreateQuestionDto.prototype, "subject", void 0);
__decorate([
    IsOptional(),
    IsString(),
    MaxLength(80),
    __metadata("design:type", String)
], CreateQuestionDto.prototype, "topic", void 0);
__decorate([
    IsEnum(['multiple_choice', 'true_false', 'fill_blank', 'essay']),
    __metadata("design:type", String)
], CreateQuestionDto.prototype, "type", void 0);
__decorate([
    IsString(),
    MaxLength(2000),
    __metadata("design:type", String)
], CreateQuestionDto.prototype, "content", void 0);
__decorate([
    IsOptional(),
    IsArray(),
    ArrayMaxSize(10),
    IsString({ each: true }),
    __metadata("design:type", Array)
], CreateQuestionDto.prototype, "options", void 0);
__decorate([
    IsOptional(),
    IsString(),
    MaxLength(500),
    __metadata("design:type", String)
], CreateQuestionDto.prototype, "correctAnswer", void 0);
__decorate([
    IsOptional(),
    IsEnum(['easy', 'medium', 'hard']),
    __metadata("design:type", String)
], CreateQuestionDto.prototype, "difficulty", void 0);
__decorate([
    IsOptional(),
    IsArray(),
    ArrayMaxSize(15),
    IsString({ each: true }),
    __metadata("design:type", Array)
], CreateQuestionDto.prototype, "tags", void 0);
//# sourceMappingURL=create-question.dto.js.map