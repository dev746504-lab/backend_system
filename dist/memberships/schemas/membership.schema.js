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
import { Types } from 'mongoose';
import { Role } from '../../common/enums/role.enum.js';
let Membership = class Membership {
    userId;
    institutionId;
    role;
    permissionSetId;
    status;
    joinedAt;
};
__decorate([
    Prop({ type: Types.ObjectId, ref: 'User', required: true, index: true }),
    __metadata("design:type", Types.ObjectId)
], Membership.prototype, "userId", void 0);
__decorate([
    Prop({ type: Types.ObjectId, ref: 'Institution', required: true, index: true }),
    __metadata("design:type", Types.ObjectId)
], Membership.prototype, "institutionId", void 0);
__decorate([
    Prop({ enum: [Role.INSTITUTION_ADMIN, Role.TEACHER, Role.STUDENT], required: true }),
    __metadata("design:type", String)
], Membership.prototype, "role", void 0);
__decorate([
    Prop({ type: Types.ObjectId, ref: 'PermissionSet' }),
    __metadata("design:type", Types.ObjectId)
], Membership.prototype, "permissionSetId", void 0);
__decorate([
    Prop({ enum: ['invited', 'active', 'removed'], default: 'active' }),
    __metadata("design:type", String)
], Membership.prototype, "status", void 0);
__decorate([
    Prop({ default: () => new Date() }),
    __metadata("design:type", Date)
], Membership.prototype, "joinedAt", void 0);
Membership = __decorate([
    Schema({ timestamps: true })
], Membership);
export { Membership };
export const MembershipSchema = SchemaFactory.createForClass(Membership);
MembershipSchema.index({ userId: 1, institutionId: 1, role: 1 }, { unique: true });
//# sourceMappingURL=membership.schema.js.map