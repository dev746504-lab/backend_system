var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuditLog } from './schemas/audit-log.schema.js';
let AuditService = class AuditService {
    auditModel;
    constructor(auditModel) {
        this.auditModel = auditModel;
    }
    async record(entry) {
        await this.auditModel.create([
            {
                institutionId: entry.institutionId,
                userId: entry.userId,
                action: entry.action,
                resourceType: entry.resourceType,
                resourceId: entry.resourceId,
                metadata: entry.metadata,
            },
        ], { session: entry.session });
    }
};
AuditService = __decorate([
    Injectable(),
    __param(0, InjectModel(AuditLog.name)),
    __metadata("design:paramtypes", [Model])
], AuditService);
export { AuditService };
//# sourceMappingURL=audit.service.js.map