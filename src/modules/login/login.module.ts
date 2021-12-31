import { Module } from '@nestjs/common';
import { FacebookModule } from 'src/service/facebook/facebook.module';
import { GoogleModule } from 'src/service/google/google.module';
import { UserModule } from '../user/user.module';
import { LoginController } from './login.controller';

@Module({
  imports:[GoogleModule,FacebookModule,UserModule],
  controllers: [LoginController]
})
export class LoginModule {}
