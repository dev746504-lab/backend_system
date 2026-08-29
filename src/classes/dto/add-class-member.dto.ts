import { IsEnum, IsMongoId } from 'class-validator';

export class AddClassMemberDto {
  @IsMongoId()
  userId: string;

  @IsEnum(['teacher', 'student'])
  role: 'teacher' | 'student';
}
