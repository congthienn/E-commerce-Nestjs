import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Promotion } from 'src/models/promotion.entity';
import { runInThisContext } from 'vm';
import { CreatePromotionDto } from './dto/create-promotion.dto';
import { PromotionService } from './promotion.service';

@Controller('promotion')
export class PromotionController {
    constructor(
        private readonly promotionService:PromotionService
    ){}

    @Get()
    findAll():Promise<Promotion[]> {
        return this.promotionService.findAll();
    }

    @Post()
    create(@Body() promotions:CreatePromotionDto):Promise<Promotion[]>{
        return this.promotionService.create(promotions);
    }

    @Delete(":id")
    delete(@Param('id') id):Promise<any>{
        return this.promotionService.delete(id);
    }

    @Put()
    update(@Body() promotions: CreatePromotionDto):Promise<Promotion[]>{
        return this.promotionService.update(promotions);
    }
}