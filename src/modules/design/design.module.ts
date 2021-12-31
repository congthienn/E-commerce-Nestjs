import { Module } from '@nestjs/common';
import { DesignService } from './design.service';
import { DesignController } from './design.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Design } from 'src/models/design.entity';
import { RolePermission } from 'src/models/role_permission.entity';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Design,RolePermission]),UserModule],
  providers: [DesignService],
  controllers: [DesignController]
})
export class DesignModule {}
