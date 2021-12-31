import { IsNotEmpty, IsNumber, IsPhoneNumber, IsString } from "class-validator";
import { memory } from "src/modules/product-type/dto/update-product-type.dto";
import { Pay_Status } from "./create-order.dto";
export class CreateOrderOnlineDto{
    id?:string;

    price?:number;

    pay_status?:Pay_Status;

    @IsPhoneNumber()
    @IsNotEmpty()
    phone:string;

    userId?:string;

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

    orderOnline?:boolean;
}