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
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Institution } from './schemas/institution.schema.js';
let InstitutionsService = class InstitutionsService {
    institutionModel;
    constructor(institutionModel) {
        this.institutionModel = institutionModel;
    }
    create(data) {
        return this.institutionModel.create([{ name: data.name, code: data.code, createdBy: data.createdBy, status: 'pending' }], { session: data.session });
    }
    findById(id) {
        return this.institutionModel.findById(id).exec();
    }
    listPending() {
        return this.institutionModel.find({ status: 'pending' }).sort({ createdAt: 1 }).exec();
    }
    async approve(id, approvedBy) {
        const institution = await this.institutionModel.findByIdAndUpdate(id, { status: 'active', approvedBy, approvedAt: new Date() }, { new: true });
        if (!institution)
            throw new NotFoundException('Không tìm thấy CSGD');
        return institution;
    }
    suspend(id) {
        return this.institutionModel.findByIdAndUpdate(id, { status: 'suspended' }, { new: true }).exec();
    }
};
InstitutionsService = __decorate([
    Injectable(),
    __param(0, InjectModel(Institution.name)),
    __metadata("design:paramtypes", [Model])
], InstitutionsService);
export { InstitutionsService };
//# sourceMappingURL=institutions.service.js.map