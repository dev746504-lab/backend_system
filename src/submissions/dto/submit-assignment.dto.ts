import { ArrayMaxSize, IsArray, IsOptional, IsString, IsUrl, MaxLength } from 'class-validator';

export class SubmitAssignmentDto {
  @IsOptional() @IsString() @MaxLength(20000)
  textContent?: string;

  @IsOptional() @IsArray() @ArrayMaxSize(10) @IsUrl({ require_tld: false }, { each: true })
  fileUrls?: string[];
}
