var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable, ForbiddenException } from '@nestjs/common';
import { Role } from '../enums/role.enum.js';
let TenantGuard = class TenantGuard {
    canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        const paramInstitutionId = request.params?.institutionId;
        if (!user)
            throw new ForbiddenException();
        if (user.role === Role.SYSTEM_ADMIN)
            return true;
        if (!paramInstitutionId)
            return true;
        if (paramInstitutionId !== user.institutionId) {
            throw new ForbiddenException('Không thể truy cập dữ liệu của cơ sở giáo dục khác');
        }
        return true;
    }
};
TenantGuard = __decorate([
    Injectable()
], TenantGuard);
export { TenantGuard };
//# sourceMappingURL=tenant.guard.js.map