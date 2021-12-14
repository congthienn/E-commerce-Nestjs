import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductInformation } from 'src/models/productInformation.entity';
import { ProductInformationService } from './product-information.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductInformation])],
  providers: [ProductInformationService],
  exports:[ProductInformationService],
})
export class ProductInformationModule {}
