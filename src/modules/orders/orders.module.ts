import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { Orders } from 'src/models/orders.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductToOrder } from 'src/models/ProductToOrder.entity';
import { ProductType } from 'src/models/product_type.entity';
import { MailModule } from 'src/service/mail/mail.module';

@Module({
  imports:[TypeOrmModule.forFeature([Orders,ProductToOrder,ProductType]),MailModule],
  providers: [OrdersService],
  controllers: [OrdersController]
})
export class OrdersModule {}
