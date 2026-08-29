var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Institution, InstitutionSchema } from './schemas/institution.schema.js';
import { InstitutionsService } from './institutions.service.js';
import { InstitutionsController } from './institutions.controller.js';
import { MembershipsModule } from '../memberships/memberships.module.js';
import { UsersModule } from '../users/users.module.js';
let InstitutionsModule = class InstitutionsModule {
};
InstitutionsModule = __decorate([
    Module({
        imports: [
            MongooseModule.forFeature([{ name: Institution.name, schema: InstitutionSchema }]),
            MembershipsModule,
            UsersModule,
        ],
        controllers: [InstitutionsController],
        providers: [InstitutionsService],
        exports: [InstitutionsService, MongooseModule],
    })
], InstitutionsModule);
export { InstitutionsModule };
//# sourceMappingURL=institutions.module.js.map