import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FCM_Token } from 'src/models/FCM_token.entity';
import { UserNotification } from 'src/models/user_notification.entity';
import { Repository } from 'typeorm';
import {Notification} from 'src/models/notification.entity';
import { AddFcmToken } from './dto/add-fcm-token.dto';
import { NotificationDto } from './dto/notification.dto';
import * as admin from 'firebase-admin';
import { v4 as uuidv4 } from 'uuid';
import { NotificationSeen } from './dto/notification-seen.dto';
@Injectable()
export class NotificationService {
    constructor(
        @InjectRepository(FCM_Token)
        private fcmtokenRepository:Repository<FCM_Token>,
        @InjectRepository(Notification)
        private notificationRepository:Repository<Notification>,
        @InjectRepository(UserNotification)
        private userNotificationRepository:Repository<UserNotification>
    ){}
    async Add_FCM_Token(fcm_token:AddFcmToken,user:any): Promise<FCM_Token>{
        const FCM_registration_token = fcm_token.FCM_registration_token;
        const addFcmToken = {
            userId:user.id,
            FCM_registration_token
        }
        return await this.fcmtokenRepository.save(addFcmToken);
    }
    async sendNotification(notification:NotificationDto):Promise<any> {
        const fcmToken = await this.fcmtokenRepository.find({
            select:['FCM_registration_token'],
            where:{userId: notification.toUserId}
        });
        const arrayFcmToken = fcmToken.map(item => {
            return item.FCM_registration_token;
        });
        const message = {
            notification:{title: notification.title,body:notification.body},
            tokens:arrayFcmToken
        }
        const  id = uuidv4();
        const addNotification = {
            id,
            title: notification.title,
            body: notification.body
        }
        await this.notificationRepository.save(addNotification);
        await this.userNotificationRepository.save({userId:notification.toUserId,notificationId:id})
        return await admin.messaging().sendMulticast(message);
    }
    async NotificationOfUser(user:any):Promise<any> {
        return await this.userNotificationRepository.find({
            relations:['notification'],
            order:{
                notification:"DESC"
            },
            where:{userId:user.id}
        });
    }
    async SeenNotification(user:any,notification:NotificationSeen):Promise<any> {
        const seen = await this.userNotificationRepository.findOne({
            where:{
                userId:user.id,
                notificationId:notification.notificationId
            }
        });
        seen.seend = true;
        return await this.userNotificationRepository.save(seen);
    }
}