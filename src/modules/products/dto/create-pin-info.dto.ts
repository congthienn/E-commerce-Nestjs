import { IsNotEmpty } from "class-validator";

export class CreatePinInfoDto{
    @IsNotEmpty()
    capacity:string;

    @IsNotEmpty()
    pin_type:string;

    @IsNotEmpty()
    maximum_support:string;

    @IsNotEmpty()
    pin_technology:string;

    @IsNotEmpty()
    charging_port:string;

    productId?:number;
}