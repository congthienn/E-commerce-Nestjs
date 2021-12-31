import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { Payments } from 'src/models/payments.entity';
import { hasPermission } from '../auth/decorator/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { PaymentsService } from './payments.service';

@Controller('payments')
export class PaymentsController {
    constructor(
        private readonly paymentService:PaymentsService
    ){}
    @hasPermission("GET_PAYMENT")
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Get()
    findAll():Promise<Payments[]>{
        return this.paymentService.findAll();
    }

    @hasPermission("POST_PAYMENT")
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Post()
    create(@Body() payment:CreatePaymentDto):Promise<Payments>{
        return this.paymentService.create(payment);
    }

    @hasPermission("PUT_PAYMENT")
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Put(":id")
    update(@Param("id") id,@Body() payment:CreatePaymentDto):Promise<Payments>{
        return this.paymentService.update(id,payment);
    }

    @hasPermission("DELETE_PAYMENT")
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Delete(":id")
    delete(@Param("id") id):Promise<any>{
        return this.paymentService.delete(id);
    }
}