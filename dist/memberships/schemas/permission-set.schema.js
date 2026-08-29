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
let PermissionSet = class PermissionSet {
    institutionId;
    name;
    permissions;
    createdBy;
};
__decorate([
    Prop({ type: Types.ObjectId, ref: 'Institution', required: true, index: true }),
    __metadata("design:type", Types.ObjectId)
], PermissionSet.prototype, "institutionId", void 0);
__decorate([
    Prop({ required: true, trim: true, maxlength: 80 }),
    __metadata("design:type", String)
], PermissionSet.prototype, "name", void 0);
__decorate([
    Prop({ type: [String], default: [] }),
    __metadata("design:type", Array)
], PermissionSet.prototype, "permissions", void 0);
__decorate([
    Prop({ type: Types.ObjectId, ref: 'User', required: true }),
    __metadata("design:type", Types.ObjectId)
], PermissionSet.prototype, "createdBy", void 0);
PermissionSet = __decorate([
    Schema({ timestamps: true })
], PermissionSet);
export { PermissionSet };
export const PermissionSetSchema = SchemaFactory.createForClass(PermissionSet);
PermissionSetSchema.index({ institutionId: 1, name: 1 }, { unique: true });
//# sourceMappingURL=permission-set.schema.js.map