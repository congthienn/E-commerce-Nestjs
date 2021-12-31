import { Body, Controller, createParamDecorator, Delete, ExecutionContext, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Orders } from 'src/models/orders.entity';
import { PaymentOnline } from 'src/service/stripe/dto/PaymentOnline.dto';
import { StripeService } from 'src/service/stripe/stripe.service';
import { hasPermission } from '../auth/decorator/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { CreateOrderOnlineDto } from './dto/create-order-online.dto';
import { CreateOrderDto, Order_Status } from './dto/create-order.dto';
import { OrderStateChangeDto } from './dto/order-state-change.dto';
import { OrdersService } from './orders.service';
export const GetUser = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
      const request = ctx.switchToHttp().getRequest();
      return request.user;
    },
  );
@Controller('orders')
export class OrdersController {
    constructor(
        private readonly orderService: OrdersService,
        private readonly stripeService:StripeService
    ){}

    @hasPermission('GET_ORDER')
    @UseGuards(JwtAuthGuard,RolesGuard)
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

    @hasPermission('GET_ORDER')
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Get(":id")
    findOne(@Param("id") id):Promise<Orders>{
        return this.orderService.findOne(id);
    }

    @hasPermission('GET_ORDER')
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Get("search/:id")
    findOrderById(@Param("id") id):Promise<Orders>{
        return this.orderService.FindOrderById(id);
    }

    @UseGuards(JwtAuthGuard)
    @Get("manager/order-by-user")
    OrderByUser(@GetUser() user):Promise<any>{
        return this.orderService.OrderByUser(user);
    }

    @hasPermission('POST_ORDER')
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Post()
    create(@Body() newOrder:CreateOrderDto):Promise<any>{
        return this.orderService.createOrderDirectly(newOrder);
    }

    @UseGuards(JwtAuthGuard)
    @Post('online')
    orderOnline(@Body() newOrder:CreateOrderOnlineDto,@GetUser() user):Promise<any>{
        return this.orderService.createOrderOnline(newOrder,user);
    }

    @hasPermission('PUT_ORDER')
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Put(":id")
    OrderStateChange(@Param("id") id,@Body() status:OrderStateChangeDto):Promise<Orders>{
        return this.orderService.OrderStateChange(id,status);
    }

    @hasPermission('DELETE_ORDER')
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Delete(":id")
    delete(@Param("id") id):Promise<any>{
        return this.orderService.CancelOrder(id);
    }

    @UseGuards(JwtAuthGuard)
    @Post("payment-online")
    payment(@GetUser() user,@Body() paymentOnline:PaymentOnline){
        return this.stripeService.charge(paymentOnline,user);
    }
}