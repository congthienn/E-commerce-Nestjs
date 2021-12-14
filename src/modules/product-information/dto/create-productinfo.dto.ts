import { IsEmpty, IsNotEmpty, IsString } from "class-validator";

export class CreateProductInfoDto{
    @IsString()
    @IsNotEmpty()
    screen:string;
    
    @IsNotEmpty()
    type:PhoneType;

    @IsString()
    @IsNotEmpty()
    operating_system:string

    @IsString()
    @IsNotEmpty()
    ram:string

    @IsString()
    @IsNotEmpty()
    rear_camera:string;

    @IsString()
    @IsNotEmpty()
    front_camera:string;

    @IsString()
    @IsNotEmpty()
    chip:string;

    @IsString()
    @IsNotEmpty()
    sim:string;

    productId?:number;

}
export enum PhoneType{
    ANDROID = 'android',
    IPHONE = 'iOS'
}