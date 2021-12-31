import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { CreateUserDto } from 'src/modules/user/dto/create-user.dto';
import { CreateCustomerDto } from 'src/modules/customer/dto/create-customer.dto';
import { Orders } from 'src/models/orders.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/models/user.entity';
@Injectable()
export class MailService {
    constructor(
        private mailerService: MailerService,
        @InjectRepository(Orders)
        private readonly orderRepository:Repository<Orders>,
        @InjectRepository(User)
        private readonly userRepository:Repository<User>
    ){}
    
    async sendUserConfirmation(name,email){
        const url = `https://www.facebook.com/congthien1601`;
        await this.mailerService.sendMail({
            to:email,
            subject:"Welcome to Project Nestjs! Confirm your Email",
            template:'./confirmation',
            context:{
                name:name,url
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
            relations:['province','district','ward','productToorder','productToorder.productType','productToorder.productType.product','user']
        });
        await this.mailerService.sendMail({
            to:order.user.email,
            subject:sub,
            template:content,
            context:{
                id:id,
                name:order.user.user_name,phone:order.phone,price:Intl.NumberFormat().format(order.price),email:order.user.email,
                location: `${order.adress}, xã ${order.ward.name}, huyện ${order.district.name}, tỉnh ${order.province.name}`
            }
        });
    }
    async sendUserForgotPassword(token:String,email:string){
        await this.mailerService.sendMail({
            to:email,
            subject:"[E-CommerceNestJS] Please reset your password",
            template:'./forgot_password',
            context:{
                token
            }
        });
    }
}
