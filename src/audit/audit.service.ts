import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types, type ClientSession } from 'mongoose';
import { AuditLog, type AuditLogDocument } from './schemas/audit-log.schema.js';

@Injectable()
export class AuditService {
  constructor(@InjectModel(AuditLog.name) private readonly auditModel: Model<AuditLogDocument>) {}

  async record(entry: {
    userId: Types.ObjectId | string;
    action: string;
    resourceType: string;
    resourceId: Types.ObjectId | string;
    metadata?: Record<string, unknown>;
    session?: ClientSession;
  }): Promise<void> {
    await this.auditModel.create(
      [
        {
          userId: entry.userId,
          action: entry.action,
          resourceType: entry.resourceType,
          resourceId: entry.resourceId,
          metadata: entry.metadata,
        },
      ],
      { session: entry.session },
    );
  }
}
