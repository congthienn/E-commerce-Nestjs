import { Body, Controller, createParamDecorator, ExecutionContext, Get, Post, Put, UseGuards } from '@nestjs/common';
import { FCM_Token } from 'src/models/FCM_token.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AddFcmToken } from './dto/add-fcm-token.dto';
import { NotificationSeen } from './dto/notification-seen.dto';
import { NotificationDto } from './dto/notification.dto';
import { NotificationService } from './notification.service';
export const GetUser = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
      const request = ctx.switchToHttp().getRequest();
      return request.user;
    },
  );
@Controller('')
export class NotificationController {
    constructor(
        private readonly notificationService: NotificationService
    ){}
    
    @UseGuards(JwtAuthGuard)
    @Post('fcm-token')
    addFcmToken(@GetUser() user,@Body() fcm_token:AddFcmToken):Promise<FCM_Token>{
        return this.notificationService.Add_FCM_Token(fcm_token,user);
    }

    @Post('send-notification')
    findAll(@Body() notification:NotificationDto):Promise<any>{
        return this.notificationService.sendNotification(notification);
    }

    @UseGuards(JwtAuthGuard)
    @Get('notification')
    notificationOfUser(@GetUser() user):Promise<any>{
        return this.notificationService.NotificationOfUser(user);
    }

    @UseGuards(JwtAuthGuard)
    @Put('notification/seen')
    seenNotification(@GetUser() user,@Body() notification:NotificationSeen):Promise<any>{
        return this.notificationService.SeenNotification(user,notification)
    }
}