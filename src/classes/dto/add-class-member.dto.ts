import { IsEmail, IsEnum, IsString, MaxLength } from 'class-validator';

export class AddClassMemberDto {
  @IsEmail()
  email: string;

  @IsString() @MaxLength(120)
  fullName: string;

  @IsEnum(['teacher', 'student'])
  role: 'teacher' | 'student';
}
