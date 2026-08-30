import { IsEmail, IsString, MaxLength } from 'class-validator';

export class CreateTeacherDto {
  @IsEmail()
  email: string;

  @IsString() @MaxLength(120)
  fullName: string;
}
