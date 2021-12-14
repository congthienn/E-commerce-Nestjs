import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Orders } from 'src/models/orders.entity';
import { CreateOrderDto, Order_Status } from './dto/create-order.dto';
import { OrderStateChangeDto } from './dto/order-state-change.dto';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
    constructor(
        private readonly orderService: OrdersService
    ){}
    @Get()
    findAll(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10,
        @Query('status') status:number
    ):Promise<Pagination<Orders>>{
        limit = limit > 100 ? 100 : limit;
        if(status === undefined){
            return this.orderService.findAll({limit,page,route:'http://localhost:3000/orders'});
        }else{
            return this.orderService.FindOrderByStatus({limit,page,route:`http://localhost:3000/orders?status=${status}`},status);
        }
    }
    @Get(":id")
    findOne(@Param("id") id):Promise<Orders>{
        return this.orderService.findOne(id);
    }
    @Get("search/:id")
    findOrderById(@Param("id") id):Promise<Orders>{
        return this.orderService.FindOrderById(id);
    }

    @Post()
    create(@Body() newOrder:CreateOrderDto):Promise<any>{
        return this.orderService.create(newOrder);
    }
    @Put(":id")
    OrderStateChange(@Param("id") id,@Body() status:OrderStateChangeDto):Promise<Orders>{
        return this.orderService.OrderStateChange(id,status);
    }
    @Delete(":id")
    delete(@Param("id") id):Promise<any>{
        return this.orderService.CancelOrder(id);
    }
}
