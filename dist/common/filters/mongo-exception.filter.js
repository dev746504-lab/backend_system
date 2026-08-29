var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Catch, ConflictException, HttpException } from '@nestjs/common';
import { MongoServerError } from 'mongodb';
let MongoExceptionFilter = class MongoExceptionFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        if (exception.code === 11000) {
            const field = Object.keys(exception.keyValue ?? {})[0] ?? 'dữ liệu';
            const conflict = new ConflictException(`Giá trị của "${field}" đã tồn tại`);
            const body = conflict.getResponse();
            response.status(conflict.getStatus()).json(body);
            return;
        }
        const fallback = new HttpException('Lỗi cơ sở dữ liệu', 500);
        response.status(fallback.getStatus()).json(fallback.getResponse());
    }
};
MongoExceptionFilter = __decorate([
    Catch(MongoServerError)
], MongoExceptionFilter);
export { MongoExceptionFilter };
//# sourceMappingURL=mongo-exception.filter.js.map