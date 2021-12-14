import { IsNotEmpty } from "class-validator";

export class CreateScreenInfoDto{
    productId?:number;

    @IsNotEmpty()
    screen_technology:string;

    @IsNotEmpty()
    resolution:string;

    @IsNotEmpty()
    widescreen:string;

    @IsNotEmpty()
    maximum_light:string;

    @IsNotEmpty()
    touch_screen:string;

}