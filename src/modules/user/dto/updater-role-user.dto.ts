import { IsString } from "class-validator";
import { UserRole } from "./create-user.dto";
export class updateRoleDto{
    @IsString()
    role:UserRole
}