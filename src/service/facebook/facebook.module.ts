import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/models/user.entity';
import { AuthModule } from 'src/modules/auth/auth.module';
import { UserModule } from 'src/modules/user/user.module';
import { MailModule } from '../mail/mail.module';
import { StripeModule } from '../stripe/stripe.module';
import { FacebookService } from './facebook.service';
import { FacebookStrategy } from './facebook.strategy';

@Module({
  imports:[TypeOrmModule.forFeature([User]),UserModule,AuthModule,MailModule,StripeModule],
  providers: [FacebookService,FacebookStrategy],
  exports:[FacebookService]
})
export class FacebookModule {}
