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
let ClassMember = class ClassMember {
    classId;
    userId;
    role;
    joinedAt;
    status;
};
__decorate([
    Prop({ type: Types.ObjectId, ref: 'Class', required: true, index: true }),
    __metadata("design:type", Types.ObjectId)
], ClassMember.prototype, "classId", void 0);
__decorate([
    Prop({ type: Types.ObjectId, ref: 'User', required: true, index: true }),
    __metadata("design:type", Types.ObjectId)
], ClassMember.prototype, "userId", void 0);
__decorate([
    Prop({ enum: ['teacher', 'student'], required: true }),
    __metadata("design:type", String)
], ClassMember.prototype, "role", void 0);
__decorate([
    Prop({ default: () => new Date() }),
    __metadata("design:type", Date)
], ClassMember.prototype, "joinedAt", void 0);
__decorate([
    Prop({ enum: ['active', 'removed'], default: 'active' }),
    __metadata("design:type", String)
], ClassMember.prototype, "status", void 0);
ClassMember = __decorate([
    Schema({ timestamps: true })
], ClassMember);
export { ClassMember };
export const ClassMemberSchema = SchemaFactory.createForClass(ClassMember);
ClassMemberSchema.index({ classId: 1, userId: 1 }, { unique: true });
//# sourceMappingURL=class-member.schema.js.map