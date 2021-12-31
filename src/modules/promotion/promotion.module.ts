import { Module } from '@nestjs/common';
import { PromotionService } from './promotion.service';
import { PromotionController } from './promotion.controller';
import { Promotion } from 'src/models/promotion.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolePermission } from 'src/models/role_permission.entity';
import { UserModule } from '../user/user.module';

@Module({
  imports:[TypeOrmModule.forFeature([Promotion,RolePermission]),UserModule],
  providers: [PromotionService],
  controllers: [PromotionController],
  exports:[PromotionService]
})
export class PromotionModule {}
