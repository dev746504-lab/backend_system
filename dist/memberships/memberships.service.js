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
import { Membership } from './schemas/membership.schema.js';
let MembershipsService = class MembershipsService {
    membershipModel;
    constructor(membershipModel) {
        this.membershipModel = membershipModel;
    }
    create(data) {
        return this.membershipModel.create([{ userId: data.userId, institutionId: data.institutionId, role: data.role }], { session: data.session });
    }
    findFirstActiveForUser(userId) {
        return this.membershipModel.findOne({ userId, status: 'active' }).sort({ createdAt: 1 }).exec();
    }
    findForUserAndInstitution(userId, institutionId) {
        return this.membershipModel.find({ userId, institutionId, status: 'active' }).exec();
    }
    listForInstitution(institutionId) {
        return this.membershipModel.find({ institutionId, status: 'active' }).populate('userId', 'fullName email').exec();
    }
};
MembershipsService = __decorate([
    Injectable(),
    __param(0, InjectModel(Membership.name)),
    __metadata("design:paramtypes", [Model])
], MembershipsService);
export { MembershipsService };
//# sourceMappingURL=memberships.service.js.map