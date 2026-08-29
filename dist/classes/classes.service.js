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
import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Class } from './schemas/class.schema.js';
import { ClassMember } from './schemas/class-member.schema.js';
import { Role } from '../common/enums/role.enum.js';
let ClassesService = class ClassesService {
    classModel;
    classMemberModel;
    constructor(classModel, classMemberModel) {
        this.classModel = classModel;
        this.classMemberModel = classMemberModel;
    }
    create(institutionId, dto) {
        return this.classModel.create({ institutionId, ...dto });
    }
    async listForUser(institutionId, user) {
        if (user.role === Role.INSTITUTION_ADMIN) {
            return this.classModel.find({ institutionId, status: 'active' }).exec();
        }
        const memberships = await this.classMemberModel.find({ userId: user.userId, status: 'active' }).exec();
        const classIds = memberships.map((m) => m.classId);
        return this.classModel.find({ _id: { $in: classIds }, institutionId, status: 'active' }).exec();
    }
    async findByIdForUser(classId, user) {
        const klass = await this.classModel.findOne({ _id: classId, institutionId: user.institutionId }).exec();
        if (!klass)
            throw new NotFoundException('Không tìm thấy lớp học');
        if (user.role !== Role.INSTITUTION_ADMIN) {
            const isMember = await this.classMemberModel.exists({ classId, userId: user.userId, status: 'active' });
            if (!isMember)
                throw new ForbiddenException('Bạn không thuộc lớp học này');
        }
        return klass;
    }
    async addMember(classId, institutionId, dto) {
        const klass = await this.classModel.findOne({ _id: classId, institutionId }).exec();
        if (!klass)
            throw new NotFoundException('Không tìm thấy lớp học');
        return this.classMemberModel.create({ classId, userId: dto.userId, role: dto.role });
    }
    listMembers(classId) {
        return this.classMemberModel.find({ classId, status: 'active' }).populate('userId', 'fullName email').exec();
    }
    isTeacherOfClass(classId, userId) {
        return this.classMemberModel.exists({ classId, userId, role: 'teacher', status: 'active' });
    }
    isStudentOfClass(classId, userId) {
        return this.classMemberModel.exists({ classId, userId, role: 'student', status: 'active' });
    }
};
ClassesService = __decorate([
    Injectable(),
    __param(0, InjectModel(Class.name)),
    __param(1, InjectModel(ClassMember.name)),
    __metadata("design:paramtypes", [Model,
        Model])
], ClassesService);
export { ClassesService };
//# sourceMappingURL=classes.service.js.map