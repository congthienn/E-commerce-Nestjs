import { IsNotEmpty, IsString } from "class-validator";

export class CreatePinDto{
    @IsString()
    @IsNotEmpty()
    name:string
}