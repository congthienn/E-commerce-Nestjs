import { IsNotEmpty, IsString } from "class-validator";

export class NotificationDto{
    @IsString()
    toUserId:string;

    @IsNotEmpty()
    title:string;

    @IsNotEmpty()
    body:string;
}