import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { CreateUserDto } from 'src/modules/user/dto/create-user.dto';
import { CreateCustomerDto } from 'src/modules/customer/dto/create-customer.dto';
import { Orders } from 'src/models/orders.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
@Injectable()
export class MailService {
    constructor(
        private mailerService: MailerService,
        @InjectRepository(Orders)
        private readonly orderRepository:Repository<Orders>
    ){}
    
    async sendUserConfirmation(user:CreateUserDto){
        const url = `https://www.facebook.com/congthien1601`;
        await this.mailerService.sendMail({
            to:user.email,
            subject:"Welcome to Project Nestjs! Confirm your Email",
            template:'./confirmation',
            context:{
                name:user.user_name,url
            }
        });
    }
    async sendCustomerConfirmation(customer: CreateCustomerDto){
        const url = `https://www.facebook.com/congthien1601`;
        await this.mailerService.sendMail({
            to:customer.email,
            subject:"Welcome to Project Nestjs! Confirm your Email",
            template:'./confirmation',
            context:{
                name:customer.name,url
            }
        });
    }

    async sendMailOrder(id:string,sub:string,content:string){
        const order = await this.orderRepository.findOne({
            where:{id:id},
            relations:['province','district','ward','productToorder','productToorder.productType','productToorder.productType.product']
        });
        await this.mailerService.sendMail({
            to:order.email,
            subject:sub,
            template:content,
            context:{
                id:id,
                name:order.customer,phone:order.phone,price:Intl.NumberFormat().format(order.price),email:order.email,
                location: `${order.adress}, xã ${order.ward.name}, huyện ${order.district.name}, tỉnh ${order.province.name}`
            }
        });
    }
}
