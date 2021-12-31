import { Module } from '@nestjs/common';
import { RolePermissionService } from './role-permission.service';
import { RolePermissionController } from './role-permission.controller';
import { RolePermission } from 'src/models/role_permission.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([RolePermission]),UserModule],
  providers: [RolePermissionService],
  controllers: [RolePermissionController]
})
export class RolePermissionModule {}
