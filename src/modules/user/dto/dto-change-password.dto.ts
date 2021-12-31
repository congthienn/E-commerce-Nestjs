import { IsNotEmpty } from "class-validator";

export class ChangePassworDto{
    @IsNotEmpty()
    old_password:string;
    
    @IsNotEmpty()
    new_password:string;

    @IsNotEmpty()
    confirm_password:string;
}