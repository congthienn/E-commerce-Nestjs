import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductImagesService } from './images.service';
import { productImages } from 'src/models/productImages.entity';
@Module({
  imports:[TypeOrmModule.forFeature([productImages])],
  providers: [ProductImagesService],
  exports: [ProductImagesService]
})
export class ProductImagesModule {}
