import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';
const cryptoRandomString = require('crypto-random-string')
import { Orders } from 'src/models/orders.entity';
import { ProductToOrder } from 'src/models/ProductToOrder.entity';
import { ProductType } from 'src/models/product_type.entity';
import { MailService } from 'src/service/mail/mail.service';
import { ILike, Repository } from 'typeorm';
import { CreateOrderDto, Order_Status } from './dto/create-order.dto';
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
            relations:['province','district','ward']
        });
    }
    async findOne(id:string):Promise<Orders>{
        return await this.orderRepository.findOne({
            where:{id:id},
            relations:['province','district','ward','productToorder','productToorder.productType','productToorder.productType.product']
        });
    }
    async create(order:CreateOrderDto):Promise<any>{
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
        const sub = `Project Nestjs đã nhận được đơn hàng ${orderid}`;
        const content ='./order';
        this.mailService.sendMailOrder(orderid,sub,content);
        return {...newOrder,...resultProductOrder}
    }
    async OrderStateChange(id:string,status:OrderStateChangeDto):Promise<Orders>{
        const findOrder = await this.orderRepository.findOne({id:id});
        const productToOrder = await this.ProductTorderRepository.find({where: {orderId:id} });
        if(Number(status.status) === 3 && Number(findOrder.order_status) !== Number(status.status)){
            for(let i = 0;i<productToOrder.length;i++){
                const productType = await this.productTypeRepository.findOne({id:productToOrder[i].productTypeId});
                productType.quantity -= productToOrder[i].quantity;
                productType.sold += productToOrder[i].quantity;
                await this.productTypeRepository.save(productType);
            }
            const sub = `Đơn hàng ${id} đã được đóng gói và vận chuyển đến cho bạn`;
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
            const sub =`Đơn hàng ${id} đã được giao thành công`;
            const content = './success';
            await this.mailService.sendMailOrder(id,sub,content);
        }
        findOrder.order_status = status.status;
        return await this.orderRepository.save(findOrder);
    }
    async CancelOrder(id:string):Promise<any>{
        const findOrder = await this.orderRepository.findOne({id:id});
        if(Number(findOrder.order_status) >= 3){
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
}