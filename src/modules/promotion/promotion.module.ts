import { Module } from '@nestjs/common';
import { PromotionService } from './promotion.service';
import { PromotionController } from './promotion.controller';
import { Promotion } from 'src/models/promotion.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([Promotion])],
  providers: [PromotionService],
  controllers: [PromotionController],
  exports:[PromotionService]
})
export class PromotionModule {}
