import { IsNotEmpty, IsNumber,IsString } from "class-validator";
export class CreateProductDto{

    @IsString()
    @IsNotEmpty()
    product_name: string;

    @IsString()
    @IsNotEmpty()
    product_review:string;

    product_img:string;

    @IsNumber()
    @IsNotEmpty()
    categoryId:number;

    @IsNumber()
    @IsNotEmpty()
    cameraId:number;

    @IsNumber()
    @IsNotEmpty()
    designId:number;

    @IsNumber()
    @IsNotEmpty()
    pinId:number;

    @IsNumber()
    @IsNotEmpty()
    designScreenId:number;

    @IsNumber()
    @IsNotEmpty()
    specialFeatureId:number;
}