import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categories } from 'src/models/categories.entity';
import { RolePermission } from 'src/models/role_permission.entity';
import { UserModule } from '../user/user.module';
@Module({
  imports:[TypeOrmModule.forFeature([Categories,RolePermission]),UserModule],
  controllers: [CategoriesController],
  providers: [CategoriesService]
})
export class CategoriesModule {}
