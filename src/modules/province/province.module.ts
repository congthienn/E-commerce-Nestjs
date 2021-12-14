import { Module } from '@nestjs/common';
import { ProvinceService } from './province.service';
import { ProvinceController } from './province.controller';
import { Province } from 'src/models/province.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([Province])],
  providers: [ProvinceService],
  controllers: [ProvinceController]
})
export class ProvinceModule {}
