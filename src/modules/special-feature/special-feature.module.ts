import { Module } from '@nestjs/common';
import { SpecialFeatureService } from './special-feature.service';
import { SpecialFeatureController } from './special-feature.controller';
import { SpecialFeature } from 'src/models/special_feature.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([SpecialFeature])],
  providers: [SpecialFeatureService],
  controllers: [SpecialFeatureController]
})
export class SpecialFeatureModule {}
