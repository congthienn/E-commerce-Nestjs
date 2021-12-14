import { Module } from '@nestjs/common';
import { DistrictService } from './district.service';
import { DistrictController } from './district.controller';
import { District } from 'src/models/district.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([District])],
  providers: [DistrictService],
  controllers: [DistrictController]
})
export class DistrictModule {}
