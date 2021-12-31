import { IsNotEmpty } from "class-validator";

export class AddFcmToken{
    @IsNotEmpty()
    FCM_registration_token:string;
}