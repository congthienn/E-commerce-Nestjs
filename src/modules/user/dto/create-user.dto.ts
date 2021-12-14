import {IsNumber,IsString,IsEmail, IsPhoneNumber} from 'class-validator';
export class CreateUserDto{
    @IsString()
    user_name:string;

    @IsPhoneNumber()
    phone:string;

    @IsString()
    password:string;

    @IsString()
    role:UserRole

    @IsEmail()
    email:string;

    @IsString()
    address:string;

    // @IsString()
    avatar?:string;
}
export enum UserRole {
    ADMIN = 'admin',   
    EDITOR = 'editor',
    USER = 'user'
}