import { IsNotEmpty, IsString } from "class-validator";

export class CreateSpecialFeatureDto{
    @IsString()
    @IsNotEmpty()
    name:string;
}