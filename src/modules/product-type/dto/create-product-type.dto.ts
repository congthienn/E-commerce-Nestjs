import { IsArray, IsNotEmpty, IsNumber, IsString } from "class-validator";

export enum memory{
    _32GB = '32GB',
    _64GB = '64GB',
    _128GB = '128GB',
    _256GB = '256GB',
    _512GB = '512GB',
}
export class CreateProductTypeDto{ 
    productId?: number;

    @IsNotEmpty({each:true})
    memory: memory[];

    @IsNumber({},{each:true})
    @IsNotEmpty({each:true})
    price: number[];

    @IsNumber({},{each:true})
    @IsNotEmpty({each:true})
    quantity: number[];
}