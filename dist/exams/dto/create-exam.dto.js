var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Type } from 'class-transformer';
import { ArrayMinSize, IsArray, IsEnum, IsInt, IsMongoId, IsOptional, IsString, Min, MaxLength, ValidateNested } from 'class-validator';
class ExamQuestionRefDto {
    questionId;
    weight;
}
__decorate([
    IsMongoId(),
    __metadata("design:type", String)
], ExamQuestionRefDto.prototype, "questionId", void 0);
__decorate([
    IsInt(),
    Min(0),
    __metadata("design:type", Number)
], ExamQuestionRefDto.prototype, "weight", void 0);
export class CreateExamDto {
    title;
    type;
    questionRefs;
    totalScore;
    durationMin;
}
__decorate([
    IsString(),
    MaxLength(200),
    __metadata("design:type", String)
], CreateExamDto.prototype, "title", void 0);
__decorate([
    IsEnum(['exam', 'quiz', 'worksheet']),
    __metadata("design:type", String)
], CreateExamDto.prototype, "type", void 0);
__decorate([
    IsArray(),
    ArrayMinSize(1),
    ValidateNested({ each: true }),
    Type(() => ExamQuestionRefDto),
    __metadata("design:type", Array)
], CreateExamDto.prototype, "questionRefs", void 0);
__decorate([
    IsInt(),
    Min(0),
    __metadata("design:type", Number)
], CreateExamDto.prototype, "totalScore", void 0);
__decorate([
    IsOptional(),
    IsInt(),
    Min(1),
    __metadata("design:type", Number)
], CreateExamDto.prototype, "durationMin", void 0);
//# sourceMappingURL=create-exam.dto.js.map