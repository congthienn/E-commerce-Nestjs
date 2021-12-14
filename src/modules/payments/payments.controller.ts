import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Payments } from 'src/models/payments.entity';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { PaymentsService } from './payments.service';

@Controller('payments')
export class PaymentsController {
    constructor(
        private readonly paymentService:PaymentsService
    ){}
    @Get()
    findAll():Promise<Payments[]>{
        return this.paymentService.findAll();
    }
    @Post()
    create(@Body() payment:CreatePaymentDto):Promise<Payments>{
        return this.paymentService.create(payment);
    }

    @Put(":id")
    update(@Param("id") id,@Body() payment:CreatePaymentDto):Promise<Payments>{
        return this.paymentService.update(id,payment);
    }

    @Delete(":id")
    delete(@Param("id") id):Promise<any>{
        return this.paymentService.delete(id);
    }
}
