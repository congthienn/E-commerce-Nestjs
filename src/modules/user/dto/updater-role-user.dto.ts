import { IsNumber, IsString } from "class-validator";
import { UserRole } from "./create-user.dto";
export class updateRoleDto{
    @IsNumber()
    role:number
}