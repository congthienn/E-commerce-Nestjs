import { IsNotEmpty } from "class-validator";

export class NotificationSeen{
    @IsNotEmpty()
    notificationId:string;
}