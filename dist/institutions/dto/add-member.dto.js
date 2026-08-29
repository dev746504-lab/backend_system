var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { IsEmail, IsEnum, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { Role } from '../../common/enums/role.enum.js';
export class AddMemberDto {
    email;
    fullName;
    role;
    permissionSetId;
}
__decorate([
    IsEmail(),
    __metadata("design:type", String)
], AddMemberDto.prototype, "email", void 0);
__decorate([
    IsString(),
    MinLength(2),
    MaxLength(120),
    __metadata("design:type", String)
], AddMemberDto.prototype, "fullName", void 0);
__decorate([
    IsEnum([Role.INSTITUTION_ADMIN, Role.TEACHER, Role.STUDENT]),
    __metadata("design:type", String)
], AddMemberDto.prototype, "role", void 0);
__decorate([
    IsOptional(),
    IsString(),
    __metadata("design:type", String)
], AddMemberDto.prototype, "permissionSetId", void 0);
//# sourceMappingURL=add-member.dto.js.map