import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types, type ClientSession } from 'mongoose';
import { Membership, type MembershipDocument } from './schemas/membership.schema.js';
import { Role } from '../common/enums/role.enum.js';

@Injectable()
export class MembershipsService {
  constructor(@InjectModel(Membership.name) private readonly membershipModel: Model<MembershipDocument>) {}

  create(data: {
    userId: string | Types.ObjectId;
    institutionId: string | Types.ObjectId;
    role: Role.INSTITUTION_ADMIN | Role.TEACHER | Role.STUDENT;
    session?: ClientSession;
  }) {
    return this.membershipModel.create(
      [{ userId: data.userId, institutionId: data.institutionId, role: data.role }],
      { session: data.session },
    );
  }

  /** A user may hold several memberships (different institutions, or admin+teacher in one) — this returns the first active one, used to pick the JWT's institution context at login. */
  findFirstActiveForUser(userId: string) {
    return this.membershipModel.findOne({ userId, status: 'active' }).sort({ createdAt: 1 }).exec();
  }

  findForUserAndInstitution(userId: string, institutionId: string) {
    return this.membershipModel.find({ userId, institutionId, status: 'active' }).exec();
  }

  listForInstitution(institutionId: string) {
    return this.membershipModel.find({ institutionId, status: 'active' }).populate('userId', 'fullName email').exec();
  }
}
