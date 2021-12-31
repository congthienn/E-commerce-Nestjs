import { IsNotEmpty } from "class-validator";

export class CreatePermissionDto{
    @IsNotEmpty()
    permission:string
    @IsNotEmpty()
    name:string;
}