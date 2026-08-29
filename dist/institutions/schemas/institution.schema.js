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
let Institution = class Institution {
    name;
    code;
    address;
    contactEmail;
    contactPhone;
    plan;
    status;
    createdBy;
    approvedBy;
    approvedAt;
};
__decorate([
    Prop({ required: true, trim: true, maxlength: 200 }),
    __metadata("design:type", String)
], Institution.prototype, "name", void 0);
__decorate([
    Prop({ required: true, unique: true, lowercase: true, trim: true }),
    __metadata("design:type", String)
], Institution.prototype, "code", void 0);
__decorate([
    Prop({ trim: true }),
    __metadata("design:type", String)
], Institution.prototype, "address", void 0);
__decorate([
    Prop({ trim: true, lowercase: true }),
    __metadata("design:type", String)
], Institution.prototype, "contactEmail", void 0);
__decorate([
    Prop({ trim: true }),
    __metadata("design:type", String)
], Institution.prototype, "contactPhone", void 0);
__decorate([
    Prop({ enum: ['free', 'standard', 'premium'], default: 'free' }),
    __metadata("design:type", String)
], Institution.prototype, "plan", void 0);
__decorate([
    Prop({ enum: ['pending', 'active', 'suspended'], default: 'pending' }),
    __metadata("design:type", String)
], Institution.prototype, "status", void 0);
__decorate([
    Prop({ type: Types.ObjectId, ref: 'User', required: true }),
    __metadata("design:type", Types.ObjectId)
], Institution.prototype, "createdBy", void 0);
__decorate([
    Prop({ type: Types.ObjectId, ref: 'User' }),
    __metadata("design:type", Types.ObjectId)
], Institution.prototype, "approvedBy", void 0);
__decorate([
    Prop(),
    __metadata("design:type", Date)
], Institution.prototype, "approvedAt", void 0);
Institution = __decorate([
    Schema({ timestamps: true })
], Institution);
export { Institution };
export const InstitutionSchema = SchemaFactory.createForClass(Institution);
InstitutionSchema.index({ code: 1 }, { unique: true });
InstitutionSchema.index({ status: 1 });
//# sourceMappingURL=institution.schema.js.map