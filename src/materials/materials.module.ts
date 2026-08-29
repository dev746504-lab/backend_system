import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LearningMaterial, LearningMaterialSchema } from './schemas/learning-material.schema.js';
import { ClassMember, ClassMemberSchema } from '../classes/schemas/class-member.schema.js';
import { MaterialsService } from './materials.service.js';
import { MaterialsController } from './materials.controller.js';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: LearningMaterial.name, schema: LearningMaterialSchema },
      { name: ClassMember.name, schema: ClassMemberSchema },
    ]),
  ],
  controllers: [MaterialsController],
  providers: [MaterialsService],
  exports: [MongooseModule],
})
export class MaterialsModule {}
