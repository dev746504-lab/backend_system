import { ArrayMaxSize, IsArray, IsEnum, IsMongoId, IsOptional } from 'class-validator';

export class ShareMaterialDto {
  @IsEnum(['class', 'institution'])
  visibility: 'class' | 'institution';

  @IsOptional() @IsArray() @ArrayMaxSize(50) @IsMongoId({ each: true })
  classIds?: string[];
}
