import { IsEnum, IsMongoId, IsOptional, IsString, MaxLength } from 'class-validator';

export class SendNotificationDto {
  @IsEnum(['system', 'class', 'user'])
  scope: 'system' | 'class' | 'user';

  @IsOptional() @IsMongoId()
  classId?: string;

  @IsOptional() @IsMongoId()
  recipientUserId?: string;

  @IsString() @MaxLength(160)
  title: string;

  @IsString() @MaxLength(2000)
  content: string;

  @IsOptional() @IsEnum(['announcement', 'assignment', 'grade', 'system'])
  type?: 'announcement' | 'assignment' | 'grade' | 'system';
}
