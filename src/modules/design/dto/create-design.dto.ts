import { IsNotEmpty, IsString } from "class-validator";

export class CreateDesignDto{
    @IsString()
    @IsNotEmpty()
    name:string;
}