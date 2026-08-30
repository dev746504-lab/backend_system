import { ArrayMaxSize, IsArray, IsDateString, IsEnum, IsInt, IsMongoId, IsOptional, IsString, Max, MaxLength, Min } from 'class-validator';

export class UpdateAssignmentDto {
  @IsOptional() @IsString() @MaxLength(200)
  title?: string;

  @IsOptional() @IsString() @MaxLength(2000)
  description?: string;

  @IsOptional() @IsEnum(['online', 'offline'])
  type?: 'online' | 'offline';

  @IsOptional() @IsMongoId()
  examId?: string;

  @IsOptional() @IsArray() @ArrayMaxSize(20) @IsMongoId({ each: true })
  attachedMaterialIds?: string[];

  @IsOptional() @IsDateString()
  dueDate?: string;

  @IsOptional() @IsInt() @Min(0) @Max(100)
  maxScore?: number;
}
