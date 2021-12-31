import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Global, Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { join } from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Orders } from 'src/models/orders.entity';
import { User } from 'src/models/user.entity';
ConfigModule.forRoot({isGlobal: true});
@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([Orders,User]),
    MailerModule.forRoot({
      transport: {
        host: process.env.MAIL_HOST,
        port: parseInt(<string>process.env.MAIL_PORT),
        secure: true,
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASSWORD,
        },
      },
      defaults: {
        from: `Project Nestjs <${process.env.MAIL_FROM}>`
      },
      template: {
        dir: join(__dirname, 'templates'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
  providers: [MailService],
  exports: [MailService]
})
export class MailModule {}
