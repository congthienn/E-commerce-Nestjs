import { Column, Entity, ManyToOne, PrimaryColumn, Unique } from "typeorm";
import { Roles } from "./roles.entity";
import { Permissions } from "./permissions.entity";

@Entity()
export class RolePermission{
    @PrimaryColumn()
    roleId:number;
    @ManyToOne(() => Roles,role => role.role_permission,{onDelete:"CASCADE"})
    role:Roles;
    
    @PrimaryColumn()
    permissionId:number;
    @ManyToOne(() => Permissions,permission => permission.role_permission,{onDelete:"CASCADE"})
    permission:Permissions;   
}