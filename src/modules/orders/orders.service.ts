import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';
const cryptoRandomString = require('crypto-random-string')
import { Orders } from 'src/models/orders.entity';
import { ProductToOrder } from 'src/models/ProductToOrder.entity';
import { ProductType } from 'src/models/product_type.entity';
import { MailService } from 'src/service/mail/mail.service';
import { ILike, Repository } from 'typeorm';
import { CreateOrderOnlineDto } from './dto/create-order-online.dto';
import { CreateOrderDto, Order_Status, Pay_Status } from './dto/create-order.dto';
import { OrderStateChangeDto } from './dto/order-state-change.dto';

@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(Orders)
        private readonly orderRepository:Repository<Orders>,
        @InjectRepository(ProductToOrder)
        private readonly ProductTorderRepository:Repository<ProductToOrder>,
        @InjectRepository(ProductType)
        private readonly productTypeRepository:Repository<ProductType>,
        private readonly mailService:MailService
    ){}
    async findAll(options:IPaginationOptions):Promise<Pagination<Orders>>{
        return await paginate<Orders>(this.orderRepository,options,{
            order:{time_create:"DESC"}
        });
    }
    async findOne(id:string):Promise<Orders>{
        return await this.orderRepository.findOne({
            where:{id:id},
            relations:['province','district','ward','productToorder','productToorder.productType','productToorder.productType.product','user']
        });
    }
    async createOrder(order:any):Promise<any>{
        const orderid = cryptoRandomString({length:15,type: 'alphanumeric'}).toLocaleUpperCase();
        const resultProductOrder = [];
        let orderPrice = 0;
        const arrayProductTypeId = [];
        for(var i = 0;i<order.productId.length;i++){
            const productType = await this.productTypeRepository.findOne({
                where:{
                    productId:order.productId[i],
                    memory:order.type[i]
                }
            });
            orderPrice += productType.price * order.quantity[i];
            arrayProductTypeId.push(productType.id);
        }
        order.id = orderid;
        order.price = orderPrice;
        const newOrder = await this.orderRepository.save(order);

        for(var i = 0;i<order.productId.length;i++){
            const productOrderDto = {
                orderId:orderid,
                quantity: order.quantity[i],
                productTypeId:arrayProductTypeId[i]
            }
            const productOrder = await this.ProductTorderRepository.save(productOrderDto);
            resultProductOrder.push(productOrder);
        }
        const sub = `Project Nestjs ???? nh???n ???????c ????n h??ng ${orderid}`;
        const content ='./order';
        this.mailService.sendMailOrder(orderid,sub,content);
        return {...newOrder,...resultProductOrder}
    }
    async createOrderDirectly(order:CreateOrderDto):Promise<any>{
        return await this.createOrder(order);
    }
    async createOrderOnline(order:CreateOrderOnlineDto,user:any):Promise<any>{
        order.userId = user.id;
        order.orderOnline = true
        return await this.createOrder(order);
    }
    async OrderStateChange(id:string,status:OrderStateChangeDto):Promise<Orders>{
        const findOrder = await this.orderRepository.findOne({id:id});
        const productToOrder = await this.ProductTorderRepository.find({where: {orderId:id}});
        if(Number(status.status) === 3 && Number(findOrder.order_status) !== Number(status.status)){
            for(let i = 0;i<productToOrder.length;i++){
                const productType = await this.productTypeRepository.findOne({id:productToOrder[i].productTypeId});
                productType.quantity -= productToOrder[i].quantity;
                productType.sold += productToOrder[i].quantity;
                await this.productTypeRepository.save(productType);
            }
            const sub = `????n h??ng ${id} ???? ???????c ????ng g??i v?? v???n chuy???n ?????n cho b???n`;
            const content = './delivery';
            this.mailService.sendMailOrder(id,sub,content);
        }
        if(Number(status.status) === 0 && Number(findOrder.order_status) !== Number(status.status)){
            for(let i = 0;i<productToOrder.length;i++){
                const productType = await this.productTypeRepository.findOne({id:productToOrder[i].productTypeId});
                productType.quantity += productToOrder[i].quantity;
                productType.sold -= productToOrder[i].quantity;
                await this.productTypeRepository.save(productType);
            }
        }
        if(Number(status.status) === 4 && Number(findOrder.order_status) !== Number(status.status)){
            findOrder.pay_status = 1;
            const sub =`????n h??ng ${id} ???? ???????c giao th??nh c??ng`;
            const content = './success';
            await this.mailService.sendMailOrder(id,sub,content);
        }
        findOrder.order_status = status.status;
        return await this.orderRepository.save(findOrder);
    }
    async CancelOrder(id:string):Promise<any>{
        const findOrder = await this.orderRepository.findOne({id:id});
        if(Number(findOrder.order_status) >= 3 || Number(findOrder.pay_status = Pay_Status.Paid)){
            throw new NotFoundException({
                code: 404,
                messages:"Can't cancel order"
            });
        }else{
            return await this.orderRepository.delete({id:id});
        }
    }
    async FindOrderByStatus(options:IPaginationOptions,id:number):Promise<Pagination<Orders>>{
        return await paginate<Orders>(this.orderRepository,options,{
            where:{order_status:id},
            relations:['province','district','ward']
        });
    }
    async FindOrderById(id:string):Promise<Orders>{
        const order = await this.orderRepository.findOne({
            where:{id:ILike(`%${id}%`)},
            relations:['province','district','ward']
        });
        if(!order)
            throw new NotFoundException({
                code:404,
                messages:"Order not found"
            });
        return order;
    }
    async OrderByUser(user:any):Promise<any> {
        return await this.orderRepository.find({
            where:{userId:user.id}
        })
    }
}