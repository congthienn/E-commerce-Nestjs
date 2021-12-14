import { IsNumber,IsString,IsPhoneNumber, IsEmail, MinLength, IsEmpty, IsNotEmpty } from "class-validator";
export class CreateCustomerDto{
    @IsString()
    @IsNotEmpty()
    name:string;

    @IsPhoneNumber()
    @IsNotEmpty()
    phoneNumber:string;

    @IsEmail()
    @IsNotEmpty()
    email:string;

    @IsString()
    address:string;
    
    @IsString()
    password:string;
}