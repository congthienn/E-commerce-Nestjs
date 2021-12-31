import { Module } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { PermissionsController } from './permissions.controller';
import { Permissions } from 'src/models/permissions.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolePermission } from 'src/models/role_permission.entity';
import { UserModule } from '../user/user.module';

@Module({
  imports:[TypeOrmModule.forFeature([Permissions,RolePermission]),UserModule],
  providers: [PermissionsService],
  controllers: [PermissionsController]
})
export class PermissionsModule {}
