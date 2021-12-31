import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payments } from 'src/models/payments.entity';
import { RolePermission } from 'src/models/role_permission.entity';
import { UserModule } from '../user/user.module';

@Module({
  imports:[TypeOrmModule.forFeature([Payments,RolePermission]),UserModule],
  providers: [PaymentsService],
  controllers: [PaymentsController]
})
export class PaymentsModule {}
