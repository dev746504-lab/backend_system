var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
let User = class User {
    email;
    passwordHash;
    fullName;
    phone;
    avatarUrl;
    status;
    emailVerified;
    isSystemAdmin;
    lastLoginAt;
};
__decorate([
    Prop({ required: true, unique: true, lowercase: true, trim: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    Prop({ required: true, select: false }),
    __metadata("design:type", String)
], User.prototype, "passwordHash", void 0);
__decorate([
    Prop({ required: true, trim: true, maxlength: 120 }),
    __metadata("design:type", String)
], User.prototype, "fullName", void 0);
__decorate([
    Prop({ trim: true }),
    __metadata("design:type", String)
], User.prototype, "phone", void 0);
__decorate([
    Prop(),
    __metadata("design:type", String)
], User.prototype, "avatarUrl", void 0);
__decorate([
    Prop({ enum: ['active', 'locked'], default: 'active' }),
    __metadata("design:type", String)
], User.prototype, "status", void 0);
__decorate([
    Prop({ default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "emailVerified", void 0);
__decorate([
    Prop({ default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "isSystemAdmin", void 0);
__decorate([
    Prop(),
    __metadata("design:type", Date)
], User.prototype, "lastLoginAt", void 0);
User = __decorate([
    Schema({ timestamps: true })
], User);
export { User };
export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.index({ email: 1 }, { unique: true });
//# sourceMappingURL=user.schema.js.map