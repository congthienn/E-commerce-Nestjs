import { Module } from '@nestjs/common';
import { SpecialFeatureService } from './special-feature.service';
import { SpecialFeatureController } from './special-feature.controller';
import { SpecialFeature } from 'src/models/special_feature.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolePermission } from 'src/models/role_permission.entity';
import { UserModule } from '../user/user.module';

@Module({
  imports:[TypeOrmModule.forFeature([SpecialFeature,RolePermission]),UserModule],
  providers: [SpecialFeatureService],
  controllers: [SpecialFeatureController]
})
export class SpecialFeatureModule {}
