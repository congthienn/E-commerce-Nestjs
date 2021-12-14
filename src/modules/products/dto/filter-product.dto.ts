import {IsNumber, IsString } from "class-validator";
export class FilterProductDto{
    @IsNumber()
    price?:number;

    @IsString()
    pin?:string;

    @IsString()
    camera?:string;

    @IsString()
    design?:string;

    @IsString()
    screen?:string;

    @IsString()
    special?:string;

    @IsString()
    memory?:string;

    @IsString()
    type?:string;

    @IsString()
    ram?:string;
}