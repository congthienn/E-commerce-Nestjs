import { Module } from '@nestjs/common';
import { WardService } from './ward.service';
import { WardController } from './ward.controller';
import { Ward } from 'src/models/ward.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([Ward])],
  providers: [WardService],
  controllers: [WardController]
})
export class WardModule {}
