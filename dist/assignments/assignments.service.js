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
import { Assignment } from './schemas/assignment.schema.js';
import { ClassMember } from '../classes/schemas/class-member.schema.js';
import { Role } from '../common/enums/role.enum.js';
let AssignmentsService = class AssignmentsService {
    assignmentModel;
    classMemberModel;
    constructor(assignmentModel, classMemberModel) {
        this.assignmentModel = assignmentModel;
        this.classMemberModel = classMemberModel;
    }
    async create(classId, teacher, dto) {
        const isTeacher = await this.classMemberModel.exists({ classId, userId: teacher.userId, role: 'teacher', status: 'active' });
        if (!isTeacher)
            throw new ForbiddenException('Bạn không phụ trách lớp này');
        return this.assignmentModel.create({
            institutionId: teacher.institutionId,
            classId,
            teacherId: teacher.userId,
            ...dto,
            dueDate: new Date(dto.dueDate),
        });
    }
    listForClass(classId) {
        return this.assignmentModel.find({ classId }).sort({ dueDate: 1 }).exec();
    }
    async findByIdForUser(assignmentId, user) {
        const assignment = await this.assignmentModel.findOne({ _id: assignmentId, institutionId: user.institutionId }).exec();
        if (!assignment)
            throw new NotFoundException('Không tìm thấy bài tập');
        if (user.role === Role.STUDENT) {
            const isMember = await this.classMemberModel.exists({ classId: assignment.classId, userId: user.userId, status: 'active' });
            if (!isMember)
                throw new ForbiddenException('Bạn không thuộc lớp được giao bài này');
        }
        return assignment;
    }
};
AssignmentsService = __decorate([
    Injectable(),
    __param(0, InjectModel(Assignment.name)),
    __param(1, InjectModel(ClassMember.name)),
    __metadata("design:paramtypes", [Model,
        Model])
], AssignmentsService);
export { AssignmentsService };
//# sourceMappingURL=assignments.service.js.map