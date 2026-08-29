var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Submission, SubmissionSchema } from './schemas/submission.schema.js';
import { Assignment, AssignmentSchema } from '../assignments/schemas/assignment.schema.js';
import { SubmissionsService } from './submissions.service.js';
import { SubmissionsController } from './submissions.controller.js';
import { ReportsModule } from '../reports/reports.module.js';
let SubmissionsModule = class SubmissionsModule {
};
SubmissionsModule = __decorate([
    Module({
        imports: [
            MongooseModule.forFeature([
                { name: Submission.name, schema: SubmissionSchema },
                { name: Assignment.name, schema: AssignmentSchema },
            ]),
            ReportsModule,
        ],
        controllers: [SubmissionsController],
        providers: [SubmissionsService],
        exports: [MongooseModule],
    })
], SubmissionsModule);
export { SubmissionsModule };
//# sourceMappingURL=submissions.module.js.map