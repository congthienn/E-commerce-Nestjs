import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Promotion } from 'src/models/promotion.entity';
import { Repository } from 'typeorm';
import { CreatePromotionDto } from './dto/create-promotion.dto';

@Injectable()
export class PromotionService {
    constructor(
        @InjectRepository(Promotion)
        private readonly promotionRepository:Repository<Promotion>
    ){}

    async findAll():Promise<Promotion[]>{
        return await this.promotionRepository.find();
    }
    
    async create(promotions: CreatePromotionDto):Promise<Promotion[]>{
        const arrayPromosion = [];
        const arrayName = promotions.name;
        for(let i = 0;i < arrayName.length;i++){
            const promotion = {
                productId:promotions.productId,
                promotion_form:promotions.name[i],
                time:promotions.time[i]
            }
            const insert = await this.promotionRepository.save(promotion);
            arrayPromosion.push(insert);
        }
        return arrayPromosion;
    }
    async update(promotions: CreatePromotionDto):Promise<Promotion[]>{
        const arrayPromosion = [];
        const arrayName = promotions.name;
        for(let i = 0;i<arrayName.length;i++){
            if(Number(promotions.promotionId[i]) !== 0){
                const promotionItem = await this.promotionRepository.findOne({
                    where:{id:promotions.promotionId[i]}
                });
                promotionItem.promotion_form = promotions.name[i];
                promotionItem.time = promotions.time[i];
                const result = await this.promotionRepository.save(promotionItem);
                arrayPromosion.push(result);
            }else{
                const newPromotion = {
                    productId:promotions.productId,
                    promotion_form:promotions.name[i],
                    time:promotions.time[i]
                }
                const reponse = await this.promotionRepository.save(newPromotion);
                arrayPromosion.push(reponse);
            }
        }
        return arrayPromosion;
    }
    async delete(id:number):Promise<any>{
        return await this.promotionRepository.delete(id);
    }
}
