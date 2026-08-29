import { ArrayMaxSize, IsArray, IsEnum, IsInt, IsOptional, IsString, IsUrl, Max, MaxLength, Min } from 'class-validator';

export class CreateMaterialDto {
  @IsString() @MaxLength(200)
  title: string;

  @IsEnum(['video', 'document', 'image', 'audio', 'interactive'])
  type: 'video' | 'document' | 'image' | 'audio' | 'interactive';

  @IsOptional() @IsString() @MaxLength(80)
  subject?: string;

  @IsOptional() @IsString() @MaxLength(40)
  gradeLevel?: string;

  @IsOptional() @IsArray() @ArrayMaxSize(15) @IsString({ each: true })
  tags?: string[];

  @IsUrl({ require_tld: false })
  fileUrl: string;

  @IsOptional() @IsString() @MaxLength(120)
  mimeType?: string;

  @IsOptional() @IsInt() @Min(1) @Max(2_000_000_000)
  fileSize?: number;
}
