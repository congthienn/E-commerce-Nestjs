import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { RolePermission } from "./role_permission.entity";

@Entity()
@Unique(['name','permission'])
export class Permissions{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    permission:string;

    @Column()
    name:string;

    @OneToMany(() => RolePermission,role_permission => role_permission.permission)
    role_permission:RolePermission[];
}