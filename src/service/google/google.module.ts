import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/models/user.entity';
import { AuthModule } from 'src/modules/auth/auth.module';
import { MailModule } from '../mail/mail.module';
import { StripeModule } from '../stripe/stripe.module';
import { GoogleService } from './google.service';
import { GoogleStrategy } from './google.strategy';

@Module({
  imports:[TypeOrmModule.forFeature([User]),MailModule,AuthModule,StripeModule],
  providers: [GoogleService,GoogleStrategy],
  exports:[GoogleService]
})
export class GoogleModule {}
