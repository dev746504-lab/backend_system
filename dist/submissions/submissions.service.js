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
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Submission } from './schemas/submission.schema.js';
import { Assignment } from '../assignments/schemas/assignment.schema.js';
import { ReportsService } from '../reports/reports.service.js';
let SubmissionsService = class SubmissionsService {
    connection;
    submissionModel;
    assignmentModel;
    reports;
    constructor(connection, submissionModel, assignmentModel, reports) {
        this.connection = connection;
        this.submissionModel = submissionModel;
        this.assignmentModel = assignmentModel;
        this.reports = reports;
    }
    async submit(assignmentId, student, dto) {
        const assignment = await this.assignmentModel.findOne({ _id: assignmentId, institutionId: student.institutionId }).exec();
        if (!assignment)
            throw new NotFoundException('Không tìm thấy bài tập');
        const isLate = Date.now() > assignment.dueDate.getTime();
        return this.submissionModel.findOneAndUpdate({ assignmentId, studentId: student.userId }, {
            $set: {
                textContent: dto.textContent,
                fileUrls: dto.fileUrls ?? [],
                submittedAt: new Date(),
                status: isLate ? 'late' : 'submitted',
            },
            $setOnInsert: { maxScoreSnapshot: assignment.maxScore },
        }, { upsert: true, new: true, runValidators: true });
    }
    findMine(assignmentId, studentId) {
        return this.submissionModel.findOne({ assignmentId, studentId }).exec();
    }
    listForAssignment(assignmentId) {
        return this.submissionModel.find({ assignmentId }).populate('studentId', 'fullName email').exec();
    }
    async grade(submissionId, grader, dto) {
        const session = await this.connection.startSession();
        try {
            let updated;
            await session.withTransaction(async () => {
                const submission = await this.submissionModel.findById(submissionId).session(session);
                if (!submission)
                    throw new NotFoundException('Không tìm thấy bài nộp');
                const assignment = await this.assignmentModel.findOne({ _id: submission.assignmentId, institutionId: grader.institutionId }).session(session);
                if (!assignment)
                    throw new ForbiddenException('Bài nộp không thuộc cơ sở giáo dục của bạn');
                if (String(assignment.teacherId) !== grader.userId) {
                    throw new ForbiddenException('Chỉ giáo viên phụ trách mới được chấm bài này');
                }
                submission.score = dto.score;
                submission.feedback = dto.feedback;
                submission.gradedBy = new Types.ObjectId(grader.userId);
                submission.gradedAt = new Date();
                submission.status = 'graded';
                await submission.save({ session });
                await this.reports.recompute(String(submission.studentId), String(assignment.classId), session);
                updated = submission;
            });
            return updated;
        }
        finally {
            await session.endSession();
        }
    }
};
SubmissionsService = __decorate([
    Injectable(),
    __param(0, InjectConnection()),
    __param(1, InjectModel(Submission.name)),
    __param(2, InjectModel(Assignment.name)),
    __metadata("design:paramtypes", [Function, Model,
        Model,
        ReportsService])
], SubmissionsService);
export { SubmissionsService };
//# sourceMappingURL=submissions.service.js.map