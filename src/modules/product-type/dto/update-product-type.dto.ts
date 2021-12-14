import { IsNumber, IsString } from "class-validator";

export enum memory{
    _32GB = '32GB',
    _64GB = '64GB',
    _128GB = '128GB',
    _256GB = '256GB',
    _512GB = '512GB',
}
export class UpdateProductTypeDto{

    @IsNumber({})
    productId?:number;

    memory:memory[];

    @IsNumber({},{each:true})
    price: number[];

    @IsNumber({},{each:true})
    quantity: number[];
}