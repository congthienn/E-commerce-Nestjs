import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { Customer } from 'src/models/customer.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
@Module({
  imports:[
    TypeOrmModule.forFeature([Customer]),
    AuthModule  
  ],
  providers: [CustomerService],
  controllers: [CustomerController]
})
export class CustomerModule {}
