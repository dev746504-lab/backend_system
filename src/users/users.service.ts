import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, type ClientSession } from 'mongoose';
import { randomBytes } from 'node:crypto';
import * as argon2 from 'argon2';
import { User, type UserDocument } from './schemas/user.schema.js';
import type { Role } from '../common/enums/role.enum.js';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {}

  findByEmail(email: string) {
    return this.userModel.findOne({ email: email.toLowerCase().trim() }).select('+passwordHash').exec();
  }

  findById(id: string) {
    return this.userModel.findById(id).exec();
  }

  find(filter: Record<string, unknown>) {
    return this.userModel.find(filter).exec();
  }

  async create(
    data: { email: string; passwordHash: string; fullName: string; role: Role; isAdmin?: boolean; phone?: string },
    session?: ClientSession,
  ) {
    const [user] = await this.userModel.create([data], { session });
    return user;
  }

  markLoggedIn(id: string) {
    return this.userModel.updateOne({ _id: id }, { lastLoginAt: new Date() }).exec();
  }

  /**
   * Reused by "thêm học sinh vào lớp" and "thêm giáo viên" — if the email has no
   * account yet, create one with a random temp password and return it once (no
   * email-invite flow exists yet, so the caller has to relay it themselves).
   */
  async findOrCreateWithTempPassword(email: string, fullName: string, role: Role, session?: ClientSession) {
    const existing = await this.findByEmail(email);
    if (existing) return { user: existing, tempPassword: undefined as string | undefined };

    const tempPassword = randomBytes(9).toString('base64url');
    const passwordHash = await argon2.hash(tempPassword);
    const user = await this.create({ email, passwordHash, fullName, role }, session);
    return { user, tempPassword };
  }
}
