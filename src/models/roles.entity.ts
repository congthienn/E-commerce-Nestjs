import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Permissions } from "./permissions.entity";
import { RolePermission } from "./role_permission.entity";
@Entity()
export class Roles{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({length:50,unique:true})
    name:string;

    @OneToMany(() => User,users => users.role)
    users:User;

    @OneToMany(() =>RolePermission,role_permission => role_permission.role)
    role_permission:RolePermission[];
}