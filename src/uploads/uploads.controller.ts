import { Controller, Post, UseGuards } from '@nestjs/common';
import { UploadsService } from './uploads.service.js';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard.js';

@Controller('uploads')
@UseGuards(JwtAuthGuard)
export class UploadsController {
  constructor(private readonly uploads: UploadsService) {}

  @Post('signature')
  signSubmissionUpload() {
    return this.uploads.signSubmissionUpload();
  }
}
