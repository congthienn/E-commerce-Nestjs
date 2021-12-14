import { IsNotEmpty } from "class-validator";

export class CreateRearCameraInfoDto{
    
    productId?:number;
    
    @IsNotEmpty()
    camera_resolution:string;

    @IsNotEmpty()
    film:string;

    @IsNotEmpty()
    flash_light:string;

    @IsNotEmpty()
    feature:string;
}