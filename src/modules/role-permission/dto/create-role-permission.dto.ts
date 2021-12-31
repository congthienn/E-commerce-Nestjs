import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateRolePermissionDto{
    @IsNumber()
    roleId:number;

    @IsNumber({},{each:true})
    @IsNotEmpty({each:true})
    permissionId:number[];
}