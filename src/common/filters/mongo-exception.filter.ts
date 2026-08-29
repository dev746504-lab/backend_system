import { ArgumentsHost, Catch, ConflictException, type ExceptionFilter, HttpException } from '@nestjs/common';
import type { Response } from 'express';
import { MongoServerError } from 'mongodb';

/**
 * Translates raw Mongo duplicate-key errors (E11000) into a clean 409,
 * so unique-index violations (email, institution code, one submission
 * per student per assignment, ...) never leak a driver stack trace.
 */
@Catch(MongoServerError)
export class MongoExceptionFilter implements ExceptionFilter {
  catch(exception: MongoServerError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

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
}
