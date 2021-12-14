import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductGeneralInfo } from 'src/models/general _info.entity';
import { ProductOperatingSystemInfo } from 'src/models/operating_system_info.entity';
import { ProductPinInfo } from 'src/models/pin_info.entity';
import { Products } from 'src/models/products.entity';
import { ProductType } from 'src/models/product_type.entity';
import { ProductRearCameraInfo } from 'src/models/rear_camera_info.entity';
import { ProductScreenInfo } from 'src/models/screen_info.entity';
import { ProductImagesModule } from '../images/images.module';
import { ProductInformationModule } from '../product-information/product-information.module';
import { ProductTypeModule } from '../product-type/product-type.module';
import { PromotionModule } from '../promotion/promotion.module';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Products,
      ProductType,
      ProductScreenInfo,
      ProductRearCameraInfo,
      ProductOperatingSystemInfo,
      ProductPinInfo,
      ProductGeneralInfo
    ]),
    ProductImagesModule,
    ProductInformationModule,
    ProductTypeModule,
    PromotionModule
  ],
  controllers: [ProductsController],
  providers: [ProductsService]
})
export class ProductsModule {}
