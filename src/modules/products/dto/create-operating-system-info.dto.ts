import { IsNotEmpty } from "class-validator";

export class CreateOperatingSystemDto{
    productId?:number;
    
    @IsNotEmpty()
    operatingSystem:string;

    @IsNotEmpty()
    CPU:string;

    @IsNotEmpty()
    CPU_speed:string;

    @IsNotEmpty()
    GPU:string;
}