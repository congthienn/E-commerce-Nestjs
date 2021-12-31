import { IsNumber, IsString } from "class-validator";

export class PaymentOnline{
    @IsString()
    orderId:string;
    
    @IsString()
    number: string;

    @IsNumber()
    exp_month:number;

    @IsNumber()
    exp_year:number;

    @IsString()
    cvc:string;
}