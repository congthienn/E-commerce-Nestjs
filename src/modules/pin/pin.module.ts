import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pin } from 'src/models/pin.entity';
import { PinController } from './pin.controller';
import { PinService } from './pin.service';

@Module({
  imports: [TypeOrmModule.forFeature([Pin])],
  controllers: [PinController],
  providers: [PinService]
})
export class PinModule {}
