import { ArrayMaxSize, IsArray, IsEnum, IsMongoId, IsOptional } from 'class-validator';

export class ShareMaterialDto {
  @IsEnum(['class', 'system'])
  visibility: 'class' | 'system';

  @IsOptional() @IsArray() @ArrayMaxSize(50) @IsMongoId({ each: true })
  classIds?: string[];
}
