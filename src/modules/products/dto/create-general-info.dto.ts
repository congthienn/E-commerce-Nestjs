import { IsDateString, IsNotEmpty } from "class-validator";

export class CreateGeneralInfoDto{
    @IsNotEmpty()
    productDesign:string;

    @IsNotEmpty()
    material:string;

    @IsNotEmpty()
    volume_size:string;

    @IsNotEmpty()
    @IsDateString()
    debut_time:Date;

    productId?:number;
}