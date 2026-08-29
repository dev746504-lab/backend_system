var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { IsNumber, IsOptional, IsString, Max, MaxLength, Min } from 'class-validator';
export class GradeSubmissionDto {
    score;
    feedback;
}
__decorate([
    IsNumber(),
    Min(0),
    Max(100),
    __metadata("design:type", Number)
], GradeSubmissionDto.prototype, "score", void 0);
__decorate([
    IsOptional(),
    IsString(),
    MaxLength(1000),
    __metadata("design:type", String)
], GradeSubmissionDto.prototype, "feedback", void 0);
//# sourceMappingURL=grade-submission.dto.js.map