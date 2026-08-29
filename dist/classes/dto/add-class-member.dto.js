var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { IsEnum, IsMongoId } from 'class-validator';
export class AddClassMemberDto {
    userId;
    role;
}
__decorate([
    IsMongoId(),
    __metadata("design:type", String)
], AddClassMemberDto.prototype, "userId", void 0);
__decorate([
    IsEnum(['teacher', 'student']),
    __metadata("design:type", String)
], AddClassMemberDto.prototype, "role", void 0);
//# sourceMappingURL=add-class-member.dto.js.map