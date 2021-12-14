import { IsNotEmpty, IsNumber } from "class-validator";
import { memory } from "./create-product-type.dto";

export class UpdateQuantityDto{
    @IsNumber()
    @IsNotEmpty()
    productId?:number;
    
    @IsNotEmpty()
    memory:memory;

    @IsNumber()
    @IsNotEmpty()
    sold?:number;
}