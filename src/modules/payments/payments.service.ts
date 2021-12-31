import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Payments } from 'src/models/payments.entity';
import { Repository } from 'typeorm';
import { CreatePaymentDto } from './dto/create-payment.dto';

@Injectable()
export class PaymentsService {
    constructor(
        @InjectRepository(Payments)
        private readonly paymentRepository:Repository<Payments>
    ){}
    async findAll():Promise<Payments[]>{
        return await this.paymentRepository.find();
    }
    async create(payment:CreatePaymentDto):Promise<Payments>{
        return await this.paymentRepository.save(payment);
    }
    async delete(id:number):Promise<any>{
        return await this.paymentRepository.delete(id);
    }
    async update(id:number,payment:CreatePaymentDto):Promise<Payments>{
        const pay = await this.paymentRepository.findOne(id);
        if(!pay)
            throw new NotFoundException({
                code: 404,
                message: 'Payment not found'
            })
        pay.formality = payment.formality;
        return await this.paymentRepository.save(pay);
    }
}
