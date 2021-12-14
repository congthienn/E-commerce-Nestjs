import { IsNotEmpty, IsString } from "class-validator";

export class CreateScreenDto{
    @IsString()
    @IsNotEmpty()
    name:string;
}