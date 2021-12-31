import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { Orders } from 'src/models/orders.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductToOrder } from 'src/models/ProductToOrder.entity';
import { ProductType } from 'src/models/product_type.entity';
import { MailModule } from 'src/service/mail/mail.module';
import { RolePermission } from 'src/models/role_permission.entity';
import { UserModule } from '../user/user.module';
import { StripeModule } from 'src/service/stripe/stripe.module';

@Module({
  imports:[TypeOrmModule.forFeature([Orders,ProductToOrder,ProductType,RolePermission]),MailModule,UserModule,StripeModule],
  providers: [OrdersService],
  controllers: [OrdersController]
})
export class OrdersModule {}
