import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { Roles } from 'src/models/roles.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolePermission } from 'src/models/role_permission.entity';
import { UserModule } from '../user/user.module';

@Module({
  imports:[TypeOrmModule.forFeature([Roles,RolePermission]),UserModule],
  providers: [RolesService],
  controllers: [RolesController]
})
export class RolesModule {}
