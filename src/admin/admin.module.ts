import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Class, ClassSchema } from '../classes/schemas/class.schema.js';
import { UsersModule } from '../users/users.module.js';
import { MaterialsModule } from '../materials/materials.module.js';
import { AdminService } from './admin.service.js';
import { AdminController } from './admin.controller.js';

@Module({
  imports: [MongooseModule.forFeature([{ name: Class.name, schema: ClassSchema }]), UsersModule, MaterialsModule],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
