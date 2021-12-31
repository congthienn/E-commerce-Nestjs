import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductType } from 'src/models/product_type.entity';
import { ProductTypeService } from './product-type.service';
import { ProductTypeController } from './product-type.controller';
import { Products } from 'src/models/products.entity';
import { RolePermission } from 'src/models/role_permission.entity';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([ProductType,Products,RolePermission]),UserModule],
  providers: [ProductTypeService],
  exports:[ProductTypeService],
  controllers: [ProductTypeController]
})
export class ProductTypeModule {}
