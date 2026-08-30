import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createHash } from 'node:crypto';

/** Giữ đồng bộ với danh sách check ở frontend (src/lib/upload.ts). */
const ALLOWED_FORMATS = 'pdf,doc,docx,jpg,jpeg,png,heic';
const SUBMISSIONS_FOLDER = 'lms-submissions';

@Injectable()
export class UploadsService {
  constructor(private readonly config: ConfigService) {}

  /**
   * Chữ ký cho phép browser upload thẳng lên Cloudinary (không qua backend,
   * không lộ api_secret) — dùng chung một chữ ký cho cả batch file vì nó chỉ
   * ký các tham số cố định (timestamp/folder/allowed_formats), không ký nội
   * dung file.
   */
  signSubmissionUpload() {
    const timestamp = Math.floor(Date.now() / 1000);
    const params: Record<string, string> = {
      allowed_formats: ALLOWED_FORMATS,
      folder: SUBMISSIONS_FOLDER,
      timestamp: String(timestamp),
    };
    const toSign = Object.keys(params)
      .sort()
      .map((key) => `${key}=${params[key]}`)
      .join('&');
    const signature = createHash('sha1')
      .update(toSign + this.config.getOrThrow<string>('CLOUDINARY_API_SECRET'))
      .digest('hex');

    return {
      cloudName: this.config.getOrThrow<string>('CLOUDINARY_CLOUD_NAME'),
      apiKey: this.config.getOrThrow<string>('CLOUDINARY_API_KEY'),
      timestamp,
      signature,
      folder: SUBMISSIONS_FOLDER,
      allowedFormats: ALLOWED_FORMATS,
    };
  }
}
