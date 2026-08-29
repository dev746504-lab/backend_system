import { ArrayMaxSize, IsArray, IsEnum, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateQuestionDto {
  @IsOptional() @IsString() @MaxLength(80)
  subject?: string;

  @IsOptional() @IsString() @MaxLength(80)
  topic?: string;

  @IsEnum(['multiple_choice', 'true_false', 'fill_blank', 'essay'])
  type: 'multiple_choice' | 'true_false' | 'fill_blank' | 'essay';

  @IsString() @MaxLength(2000)
  content: string;

  @IsOptional() @IsArray() @ArrayMaxSize(10) @IsString({ each: true })
  options?: string[];

  @IsOptional() @IsString() @MaxLength(500)
  correctAnswer?: string;

  @IsOptional() @IsEnum(['easy', 'medium', 'hard'])
  difficulty?: 'easy' | 'medium' | 'hard';

  @IsOptional() @IsArray() @ArrayMaxSize(15) @IsString({ each: true })
  tags?: string[];
}
