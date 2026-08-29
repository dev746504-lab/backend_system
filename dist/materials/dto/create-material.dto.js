var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ArrayMaxSize, IsArray, IsEnum, IsInt, IsOptional, IsString, IsUrl, Max, MaxLength, Min } from 'class-validator';
export class CreateMaterialDto {
    title;
    type;
    subject;
    gradeLevel;
    tags;
    fileUrl;
    mimeType;
    fileSize;
}
__decorate([
    IsString(),
    MaxLength(200),
    __metadata("design:type", String)
], CreateMaterialDto.prototype, "title", void 0);
__decorate([
    IsEnum(['video', 'document', 'image', 'audio', 'interactive']),
    __metadata("design:type", String)
], CreateMaterialDto.prototype, "type", void 0);
__decorate([
    IsOptional(),
    IsString(),
    MaxLength(80),
    __metadata("design:type", String)
], CreateMaterialDto.prototype, "subject", void 0);
__decorate([
    IsOptional(),
    IsString(),
    MaxLength(40),
    __metadata("design:type", String)
], CreateMaterialDto.prototype, "gradeLevel", void 0);
__decorate([
    IsOptional(),
    IsArray(),
    ArrayMaxSize(15),
    IsString({ each: true }),
    __metadata("design:type", Array)
], CreateMaterialDto.prototype, "tags", void 0);
__decorate([
    IsUrl({ require_tld: false }),
    __metadata("design:type", String)
], CreateMaterialDto.prototype, "fileUrl", void 0);
__decorate([
    IsOptional(),
    IsString(),
    MaxLength(120),
    __metadata("design:type", String)
], CreateMaterialDto.prototype, "mimeType", void 0);
__decorate([
    IsOptional(),
    IsInt(),
    Min(1),
    Max(2_000_000_000),
    __metadata("design:type", Number)
], CreateMaterialDto.prototype, "fileSize", void 0);
//# sourceMappingURL=create-material.dto.js.map