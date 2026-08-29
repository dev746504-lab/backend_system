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
import { StudentProgress } from './schemas/student-progress.schema.js';
import { Submission } from '../submissions/schemas/submission.schema.js';
import { Assignment } from '../assignments/schemas/assignment.schema.js';
import { Class } from '../classes/schemas/class.schema.js';
let ReportsService = class ReportsService {
    progressModel;
    submissionModel;
    assignmentModel;
    classModel;
    constructor(progressModel, submissionModel, assignmentModel, classModel) {
        this.progressModel = progressModel;
        this.submissionModel = submissionModel;
        this.assignmentModel = assignmentModel;
        this.classModel = classModel;
    }
    async recompute(studentId, classId, session) {
        const klass = await this.classModel.findById(classId, { subject: 1 }).session(session).exec();
        const assignmentIds = await this.assignmentModel.find({ classId }, { _id: 1 }).session(session).exec();
        const ids = assignmentIds.map((a) => a._id);
        const submissions = await this.submissionModel
            .find({ assignmentId: { $in: ids }, studentId })
            .session(session)
            .exec();
        const graded = submissions.filter((s) => s.status === 'graded' && s.score != null);
        const avgScore = graded.length ? graded.reduce((sum, s) => sum + (s.score ?? 0), 0) / graded.length : 0;
        const lastGraded = graded.reduce((latest, s) => (s.gradedAt && (!latest || s.gradedAt > latest) ? s.gradedAt : latest), undefined);
        await this.progressModel.updateOne({ studentId, classId, subject: klass?.subject ?? null }, {
            avgScore,
            completedCount: graded.length,
            totalCount: ids.length,
            lastGradedAt: lastGraded,
        }, { upsert: true, session });
    }
    forStudent(studentId, classId) {
        return this.progressModel.find({ studentId, ...(classId && { classId }) }).exec();
    }
    forClass(classId) {
        return this.progressModel.find({ classId }).populate('studentId', 'fullName email').exec();
    }
};
ReportsService = __decorate([
    Injectable(),
    __param(0, InjectModel(StudentProgress.name)),
    __param(1, InjectModel(Submission.name)),
    __param(2, InjectModel(Assignment.name)),
    __param(3, InjectModel(Class.name)),
    __metadata("design:paramtypes", [Model,
        Model,
        Model,
        Model])
], ReportsService);
export { ReportsService };
//# sourceMappingURL=reports.service.js.map