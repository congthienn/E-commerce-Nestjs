import { IsNotEmpty, IsNumber } from "class-validator";
import { memory } from "./create-product-type.dto";

export class InsertQuantityDto{
    @IsNumber()
    @IsNotEmpty()
    productId?:number;
    
    @IsNotEmpty()
    memory:memory;

    @IsNumber()
    @IsNotEmpty()
    quantity:number;
}