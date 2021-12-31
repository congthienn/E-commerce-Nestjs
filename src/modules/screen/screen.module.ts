import { Module } from '@nestjs/common';
import { ScreenService } from './screen.service';
import { ScreenController } from './screen.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DesignScreen } from 'src/models/designScreen.entity';
import { RolePermission } from 'src/models/role_permission.entity';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([DesignScreen,RolePermission]),UserModule],
  providers: [ScreenService],
  controllers: [ScreenController]
})
export class ScreenModule {}
