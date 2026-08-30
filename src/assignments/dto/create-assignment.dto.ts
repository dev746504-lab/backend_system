import { ArrayMaxSize, IsArray, IsDateString, IsEnum, IsInt, IsMongoId, IsOptional, IsString, Max, MaxLength, Min } from 'class-validator';

export class CreateAssignmentDto {
  @IsString() @MaxLength(200)
  title: string;

  @IsOptional() @IsString() @MaxLength(2000)
  description?: string;

  @IsEnum(['online', 'offline'])
  type: 'online' | 'offline';

  @IsOptional() @IsMongoId()
  examId?: string;

  @IsOptional() @IsArray() @ArrayMaxSize(20) @IsMongoId({ each: true })
  attachedMaterialIds?: string[];

  @IsDateString()
  dueDate: string;

  @IsInt() @Min(0) @Max(100)
  maxScore: number;

  /** Không nhận 'closed' ở đây - việc đóng bài tập chỉ đi qua endpoint publish/close riêng. */
  @IsOptional() @IsEnum(['draft', 'assigned'])
  status?: 'draft' | 'assigned';
}
