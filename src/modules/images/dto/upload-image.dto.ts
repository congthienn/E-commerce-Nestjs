import { IsNumber,IsString } from "class-validator";
export class UploadImgDto{
    // @IsString()
    image_path:string;

    // @IsNumber()
    productId:number
}