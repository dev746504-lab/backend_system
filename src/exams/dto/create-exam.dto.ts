import { Type } from 'class-transformer';
import { ArrayMinSize, IsArray, IsEnum, IsInt, IsMongoId, IsOptional, IsString, Min, MaxLength, ValidateNested } from 'class-validator';

class ExamQuestionRefDto {
  @IsMongoId()
  questionId: string;

  @IsInt() @Min(0)
  weight: number;
}

export class CreateExamDto {
  @IsString() @MaxLength(200)
  title: string;

  @IsEnum(['exam', 'quiz', 'worksheet'])
  type: 'exam' | 'quiz' | 'worksheet';

  @IsArray() @ArrayMinSize(1) @ValidateNested({ each: true }) @Type(() => ExamQuestionRefDto)
  questionRefs: ExamQuestionRefDto[];

  @IsInt() @Min(0)
  totalScore: number;

  @IsOptional() @IsInt() @Min(1)
  durationMin?: number;
}
