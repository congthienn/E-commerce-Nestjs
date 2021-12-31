import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Orders } from 'src/models/orders.entity';
import { ProductToOrder } from 'src/models/ProductToOrder.entity';
import { ProductType } from 'src/models/product_type.entity';
import { User } from 'src/models/user.entity';
import { Pay_Status } from 'src/modules/orders/dto/create-order.dto';
import { UserService } from 'src/modules/user/user.service';
import Stripe from 'stripe';
import { Repository } from 'typeorm';
import { MailService } from '../mail/mail.service';
import { PaymentOnline } from './dto/PaymentOnline.dto';

@Injectable()
export class StripeService {
    private stripe: Stripe;
    constructor(
        private configService: ConfigService,
        @InjectRepository(Orders)
        private readonly orderRepository: Repository<Orders>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(ProductType)
        private readonly productTypeRepository: Repository<ProductType>,
        @InjectRepository(ProductToOrder)
        private readonly ProductTorderRepository:Repository<ProductToOrder>,
        private readonly mailService:MailService
    ){
        this.stripe = new Stripe(configService.get('STRIPE_SECRET_KEY'),{apiVersion:"2020-08-27"});
    }
    //Create Customer
    public async createCustomer(name:string,email: string){
        return await this.stripe.customers.create({name,email})
    }
    // Online Payment
    public async charge(paymentOnline:PaymentOnline,ReqUser:any){
        const checkOrder = await this.orderRepository.findOne({
            relations:['user'],
            where:{
                id:paymentOnline.orderId,
                user:{
                    id:ReqUser.id
                }
            }
        });
        if(!checkOrder)
            throw new NotFoundException({
                code:403,
                message:"Forbidden resource"
            })
        const paymentMethod = await this.stripe.paymentMethods.create({
            type:"card",
            card:{
                number:paymentOnline.number,
                exp_month:paymentOnline.exp_month,
                exp_year:paymentOnline.exp_year,
                cvc:paymentOnline.cvc
            }
        });
        const order = await this.orderRepository.findOne({
            relations:['user'],
            where:{id:paymentOnline.orderId}
        });
        const user = await this.userRepository.findOne(ReqUser.id);
        if(!order)
            throw new NotFoundException({
                code: 404,
                message: "Order not found"
            });
        const response = await this.stripe.paymentIntents.create({
            amount:order.price,
            payment_method:paymentMethod.id,
            customer: user.stripeCustomerId,
            description:`Payment order ${order.id}`,
            currency: this.configService.get('STRIPE_CURRENCY'),
            confirm: true,
            receipt_email:order.user.email,
            setup_future_usage:'on_session',
            
        });
        
        let paymentStatus = response.status || "Failed";
        if(paymentStatus === "succeeded"){
            order.pay_status = Pay_Status.Paid;
            await this.orderRepository.save(order);
            const productToOrder = await this.ProductTorderRepository.find({where: {orderId:paymentOnline.orderId}});
            for(let i = 0;i<productToOrder.length;i++){
                const productType = await this.productTypeRepository.findOne({id:productToOrder[i].productTypeId});
                productType.quantity -= productToOrder[i].quantity;
                productType.sold += productToOrder[i].quantity;
                await this.productTypeRepository.save(productType);
            }
            const sub =`Bạn đã đặt hàng và thanh toán online thành công đơn hàng ${paymentOnline.orderId}`;
            const content = './order';
            await this.mailService.sendMailOrder(paymentOnline.orderId,sub,content);
        }
        return paymentStatus;
    }
}