import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateClassDto {
  @IsString() @MinLength(1) @MaxLength(120)
  name: string;

  @IsOptional() @IsString() @MaxLength(80)
  subject?: string;

  @IsOptional() @IsString() @MaxLength(40)
  gradeLevel?: string;

  @IsString() @MinLength(4) @MaxLength(20)
  academicYear: string;
}
