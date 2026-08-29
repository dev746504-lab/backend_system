var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { IsEmail, IsString, Matches, MaxLength, MinLength } from 'class-validator';
export class RegisterInstitutionDto {
    fullName;
    email;
    password;
    institutionName;
    institutionCode;
}
__decorate([
    IsString(),
    MinLength(2),
    MaxLength(120),
    __metadata("design:type", String)
], RegisterInstitutionDto.prototype, "fullName", void 0);
__decorate([
    IsEmail(),
    __metadata("design:type", String)
], RegisterInstitutionDto.prototype, "email", void 0);
__decorate([
    IsString(),
    MinLength(8),
    MaxLength(72),
    Matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
        message: 'Mật khẩu cần ít nhất 1 chữ hoa, 1 chữ thường và 1 chữ số',
    }),
    __metadata("design:type", String)
], RegisterInstitutionDto.prototype, "password", void 0);
__decorate([
    IsString(),
    MinLength(2),
    MaxLength(200),
    __metadata("design:type", String)
], RegisterInstitutionDto.prototype, "institutionName", void 0);
__decorate([
    IsString(),
    MinLength(2),
    MaxLength(40),
    Matches(/^[a-z0-9-]+$/, { message: 'code chỉ gồm chữ thường, số và dấu gạch ngang' }),
    __metadata("design:type", String)
], RegisterInstitutionDto.prototype, "institutionCode", void 0);
//# sourceMappingURL=register-institution.dto.js.map