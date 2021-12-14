import { IsArray, IsDateString, IsNotEmpty, IsNumber } from "class-validator";

export class CreatePromotionDto{
    productId?:number;

    promotionId:number[];

    @IsArray()
    @IsNotEmpty({each:true})
    name:string[];

    time:Date[];
}