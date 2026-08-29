import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Class, ClassSchema } from './schemas/class.schema.js';
import { ClassMember, ClassMemberSchema } from './schemas/class-member.schema.js';
import { ClassesService } from './classes.service.js';
import { ClassesController } from './classes.controller.js';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Class.name, schema: ClassSchema },
      { name: ClassMember.name, schema: ClassMemberSchema },
    ]),
  ],
  controllers: [ClassesController],
  providers: [ClassesService],
  exports: [ClassesService, MongooseModule],
})
export class ClassesModule {}
