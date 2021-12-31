import { forwardRef, Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../models/user.entity';
import { AuthModule } from '../auth/auth.module';
import { RolePermission } from 'src/models/role_permission.entity';
import { StripeModule } from 'src/service/stripe/stripe.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User,RolePermission]),
    AuthModule,
    StripeModule
  ],
  providers: [UserService],
  controllers: [UserController],
  exports:[UserService]
})
export class UserModule {}
