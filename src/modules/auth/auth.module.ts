import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RolesGuard } from './guards/roles.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { JwtStrategy } from './guards/jwt.strategy';
import { UserModule } from '../user/user.module';
import { RolePermission } from 'src/models/role_permission.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[
      TypeOrmModule.forFeature([RolePermission]),
      ConfigModule.forRoot({isGlobal: true}),
      forwardRef(() => UserModule),
      JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
          secret:configService.get('JWT_SECRET'),
          signOptions: {expiresIn: '5h'}
      }),
  })
  ],
  providers: [AuthService,RolesGuard,JwtAuthGuard,JwtStrategy],
  exports:[AuthService]
})
export class AuthModule {}