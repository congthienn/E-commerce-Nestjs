import { IsString } from "class-validator";
export class FilterUserDto{
    @IsString()
    user_name:string
}