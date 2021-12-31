import {IsNumber,IsString,IsEmail, IsPhoneNumber, IsNotEmpty} from 'class-validator';
export class CreateUserDto{
    id?:string;

    @IsString()
    user_name:string;

    @IsPhoneNumber()
    phone:string;

    @IsString()
    password:string;

    @IsEmail()
    email:string;

    @IsNumber()
    roleId:number;

    provinceId?:string;

    districtId?:string;

    wardId?:string;

    avatar?:string;
    
    stripeCustomerId?:string
}
export enum UserRole {
    ADMIN = 'admin',   
    EDITOR = 'editor',
    USER = 'user'
}