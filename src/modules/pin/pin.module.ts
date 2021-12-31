import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pin } from 'src/models/pin.entity';
import { RolePermission } from 'src/models/role_permission.entity';
import { UserModule } from '../user/user.module';
import { PinController } from './pin.controller';
import { PinService } from './pin.service';

@Module({
  imports: [TypeOrmModule.forFeature([Pin,RolePermission]),UserModule],
  controllers: [PinController],
  providers: [PinService]
})
export class PinModule {}
