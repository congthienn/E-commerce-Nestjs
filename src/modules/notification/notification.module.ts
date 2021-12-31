import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { FCM_Token } from 'src/models/FCM_token.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserNotification } from 'src/models/user_notification.entity';
import {Notification} from 'src/models/notification.entity';
@Module({
  imports:[TypeOrmModule.forFeature([FCM_Token,Notification,UserNotification])],
  providers: [NotificationService],
  controllers: [NotificationController]
})
export class NotificationModule {}