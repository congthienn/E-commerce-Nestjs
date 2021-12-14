import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { Customer } from 'src/models/customer.entity';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { LoginCustomerDto } from './dto/login-customer.dto';
@Controller('customer')
export class CustomerController {
    constructor(private customerService: CustomerService){}
    
    @Get()
    findAll(): Promise<Customer[]>{
        return this.customerService.finAll()
    }
    @Get(':email')
    findByEmail(@Param('email') email):Promise<Customer>{
        return this.customerService.findByEmail(email);
    }

    @Post()
    create(@Body() customer:CreateCustomerDto):Promise<any>{
        return this.customerService.create(customer);
    }
    @Post('login')
    login(@Body() customer:LoginCustomerDto):Promise<any>{
        return this.customerService.login(customer);
    }

    @Put(':email')
    update(@Body() customer:CreateCustomerDto,@Param('email') email):Promise<any>{
        return this.customerService.update(customer,email);
    }
}