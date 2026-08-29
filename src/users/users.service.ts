import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, type ClientSession } from 'mongoose';
import { User, type UserDocument } from './schemas/user.schema.js';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {}

  findByEmail(email: string) {
    return this.userModel.findOne({ email: email.toLowerCase().trim() }).select('+passwordHash').exec();
  }

  findById(id: string) {
    return this.userModel.findById(id).exec();
  }

  async create(
    data: { email: string; passwordHash: string; fullName: string; phone?: string },
    session?: ClientSession,
  ) {
    const [user] = await this.userModel.create([data], { session });
    return user;
  }

  markLoggedIn(id: string) {
    return this.userModel.updateOne({ _id: id }, { lastLoginAt: new Date() }).exec();
  }
}
