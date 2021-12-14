import { IsDateString, IsEmail, IsNotEmpty, IsNumber, IsPhoneNumber, IsString } from "class-validator";
import { memory } from "src/modules/product-type/dto/update-product-type.dto";

export class CreateOrderDto{
    id?:string;

    @IsString()
    @IsNotEmpty()
    customer:string;

    price?:number;

    pay_status?:Pay_Status;

    @IsPhoneNumber()
    @IsNotEmpty()
    phone:string;

    @IsEmail()
    @IsNotEmpty()
    email:string;

    @IsNotEmpty()
    @IsDateString()
    delivery_time:Date;

    @IsNotEmpty()
    paymentId:number;

    @IsString()
    @IsNotEmpty()
    adress:string;

    @IsNotEmpty()
    provinceId:number;

    @IsNotEmpty()
    districtId:number;

    @IsNotEmpty()
    wardId:number;

    @IsNumber({},{each:true})
    @IsNotEmpty({each:true})
    productId:number[];

    @IsNotEmpty({each:true})
    type:memory[];

    @IsNumber({},{each:true})
    @IsNotEmpty({each:true})
    quantity:number[];
}
export enum Order_Status{
    Error = -1,
    Cancel = 0,
    Wait = 1,
    Handle = 2,
    Delivery = 3,
    Success = 4
}
export enum Pay_Status{
    Paid = 1,
    Unpaid = 0

}