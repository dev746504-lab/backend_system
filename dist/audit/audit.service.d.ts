import { Model, Types, type ClientSession } from 'mongoose';
import { type AuditLogDocument } from './schemas/audit-log.schema.js';
export declare class AuditService {
    private readonly auditModel;
    constructor(auditModel: Model<AuditLogDocument>);
    record(entry: {
        institutionId?: Types.ObjectId | string;
        userId: Types.ObjectId | string;
        action: string;
        resourceType: string;
        resourceId: Types.ObjectId | string;
        metadata?: Record<string, unknown>;
        session?: ClientSession;
    }): Promise<void>;
}
