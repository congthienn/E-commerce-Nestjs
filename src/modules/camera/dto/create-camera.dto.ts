import { IsNotEmpty, IsString } from "class-validator";

export class CreateCameraDto{
    @IsString()
    @IsNotEmpty()
    name:string;
}