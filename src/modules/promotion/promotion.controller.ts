import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { Promotion } from 'src/models/promotion.entity';
import { runInThisContext } from 'vm';
import { hasPermission } from '../auth/decorator/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { CreatePromotionDto } from './dto/create-promotion.dto';
import { PromotionService } from './promotion.service';

@Controller('promotion')
export class PromotionController {
    constructor(
        private readonly promotionService:PromotionService
    ){}

    @hasPermission("GET_PROMOTION")
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Get()
    findAll():Promise<Promotion[]> {
        return this.promotionService.findAll();
    }

    @hasPermission("GET_PROMOTION")
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Get(":id")
    findOne(@Param("id") id):Promise<Promotion[]>{
        return this.promotionService.findOne(id);
    }

    @hasPermission("POST_PROMOTION")
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Post()
    create(@Body() promotions:CreatePromotionDto):Promise<Promotion[]>{
        return this.promotionService.create(promotions);
    }

    @hasPermission("DELETE_PROMOTION")
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Delete(":id")
    delete(@Param('id') id):Promise<any>{
        return this.promotionService.delete(id);
    }

    @hasPermission("PUT_PROMOTION")
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Put()
    update(@Body() promotions: CreatePromotionDto):Promise<Promotion[]>{
        return this.promotionService.update(promotions);
    }
}