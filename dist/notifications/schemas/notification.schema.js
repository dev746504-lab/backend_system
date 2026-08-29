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
let ReadReceipt = class ReadReceipt {
    userId;
    readAt;
};
__decorate([
    Prop({ type: Types.ObjectId, ref: 'User', required: true }),
    __metadata("design:type", Types.ObjectId)
], ReadReceipt.prototype, "userId", void 0);
__decorate([
    Prop({ required: true }),
    __metadata("design:type", Date)
], ReadReceipt.prototype, "readAt", void 0);
ReadReceipt = __decorate([
    Schema({ _id: false })
], ReadReceipt);
export { ReadReceipt };
export const ReadReceiptSchema = SchemaFactory.createForClass(ReadReceipt);
let Notification = class Notification {
    institutionId;
    senderId;
    scope;
    classId;
    recipientUserId;
    title;
    content;
    type;
    readBy;
};
__decorate([
    Prop({ type: Types.ObjectId, ref: 'Institution', required: true, index: true }),
    __metadata("design:type", Types.ObjectId)
], Notification.prototype, "institutionId", void 0);
__decorate([
    Prop({ type: Types.ObjectId, ref: 'User', required: true }),
    __metadata("design:type", Types.ObjectId)
], Notification.prototype, "senderId", void 0);
__decorate([
    Prop({ enum: ['institution', 'class', 'user'], required: true }),
    __metadata("design:type", String)
], Notification.prototype, "scope", void 0);
__decorate([
    Prop({ type: Types.ObjectId, ref: 'Class' }),
    __metadata("design:type", Types.ObjectId)
], Notification.prototype, "classId", void 0);
__decorate([
    Prop({ type: Types.ObjectId, ref: 'User' }),
    __metadata("design:type", Types.ObjectId)
], Notification.prototype, "recipientUserId", void 0);
__decorate([
    Prop({ required: true, trim: true, maxlength: 160 }),
    __metadata("design:type", String)
], Notification.prototype, "title", void 0);
__decorate([
    Prop({ required: true, trim: true, maxlength: 2000 }),
    __metadata("design:type", String)
], Notification.prototype, "content", void 0);
__decorate([
    Prop({ enum: ['announcement', 'assignment', 'grade', 'system'], default: 'announcement' }),
    __metadata("design:type", String)
], Notification.prototype, "type", void 0);
__decorate([
    Prop({ type: [ReadReceiptSchema], default: [] }),
    __metadata("design:type", Array)
], Notification.prototype, "readBy", void 0);
Notification = __decorate([
    Schema({ timestamps: true })
], Notification);
export { Notification };
export const NotificationSchema = SchemaFactory.createForClass(Notification);
NotificationSchema.index({ institutionId: 1, createdAt: -1 });
//# sourceMappingURL=notification.schema.js.map