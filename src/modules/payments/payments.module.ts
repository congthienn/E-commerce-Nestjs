import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payments } from 'src/models/payments.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Payments])],
  providers: [PaymentsService],
  controllers: [PaymentsController]
})
export class PaymentsModule {}
