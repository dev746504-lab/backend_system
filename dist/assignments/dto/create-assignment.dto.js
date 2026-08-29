var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ArrayMaxSize, IsArray, IsDateString, IsEnum, IsInt, IsMongoId, IsOptional, IsString, Max, MaxLength, Min } from 'class-validator';
export class CreateAssignmentDto {
    title;
    description;
    type;
    examId;
    attachedMaterialIds;
    dueDate;
    maxScore;
}
__decorate([
    IsString(),
    MaxLength(200),
    __metadata("design:type", String)
], CreateAssignmentDto.prototype, "title", void 0);
__decorate([
    IsOptional(),
    IsString(),
    MaxLength(2000),
    __metadata("design:type", String)
], CreateAssignmentDto.prototype, "description", void 0);
__decorate([
    IsEnum(['online', 'offline']),
    __metadata("design:type", String)
], CreateAssignmentDto.prototype, "type", void 0);
__decorate([
    IsOptional(),
    IsMongoId(),
    __metadata("design:type", String)
], CreateAssignmentDto.prototype, "examId", void 0);
__decorate([
    IsOptional(),
    IsArray(),
    ArrayMaxSize(20),
    IsMongoId({ each: true }),
    __metadata("design:type", Array)
], CreateAssignmentDto.prototype, "attachedMaterialIds", void 0);
__decorate([
    IsDateString(),
    __metadata("design:type", String)
], CreateAssignmentDto.prototype, "dueDate", void 0);
__decorate([
    IsInt(),
    Min(0),
    Max(100),
    __metadata("design:type", Number)
], CreateAssignmentDto.prototype, "maxScore", void 0);
//# sourceMappingURL=create-assignment.dto.js.map