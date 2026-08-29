import { IsEmail, IsEnum, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { Role } from '../../common/enums/role.enum.js';

export class AddMemberDto {
  @IsEmail()
  email: string;

  @IsString() @MinLength(2) @MaxLength(120)
  fullName: string;

  @IsEnum([Role.TEACHER, Role.STUDENT])
  role: Role.TEACHER | Role.STUDENT;

  @IsOptional() @IsString()
  permissionSetId?: string;
}
