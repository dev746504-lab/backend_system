import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types, type ClientSession } from 'mongoose';
import { Institution, type InstitutionDocument } from './schemas/institution.schema.js';

@Injectable()
export class InstitutionsService {
  constructor(@InjectModel(Institution.name) private readonly institutionModel: Model<InstitutionDocument>) {}

  create(data: { name: string; code: string; createdBy: Types.ObjectId | string; session?: ClientSession }) {
    return this.institutionModel.create(
      [{ name: data.name, code: data.code, createdBy: data.createdBy, status: 'pending' }],
      { session: data.session },
    );
  }

  findById(id: string) {
    return this.institutionModel.findById(id).exec();
  }

  listPending() {
    return this.institutionModel.find({ status: 'pending' }).sort({ createdAt: 1 }).exec();
  }

  async approve(id: string, approvedBy: string) {
    const institution = await this.institutionModel.findByIdAndUpdate(
      id,
      { status: 'active', approvedBy, approvedAt: new Date() },
      { new: true },
    );
    if (!institution) throw new NotFoundException('Không tìm thấy CSGD');
    return institution;
  }

  suspend(id: string) {
    return this.institutionModel.findByIdAndUpdate(id, { status: 'suspended' }, { new: true }).exec();
  }
}
