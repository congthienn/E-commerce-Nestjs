import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Orders } from 'src/models/orders.entity';
import { ProductToOrder } from 'src/models/ProductToOrder.entity';
import { ProductType } from 'src/models/product_type.entity';
import { User } from 'src/models/user.entity';
import { MailModule } from '../mail/mail.module';
import { StripeService } from './stripe.service';

@Module({
  imports:[TypeOrmModule.forFeature([Orders,User,ProductType,ProductToOrder]),MailModule],
  providers: [StripeService],
  exports: [StripeService]
})
export class StripeModule {}
