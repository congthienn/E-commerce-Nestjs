import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { Orders } from "./orders.entity";
import { Province } from "./province.entity";
import { User } from "./user.entity";
import { Ward } from "./ward.entity";

@Entity()
export class District{
    @PrimaryColumn({length:6})
    id:string

    @Column({length:255})
    name:string;

    @Column({length:255})
    type:string;

    @Column()
    provinceId:string;

    @ManyToOne(() => Province,province => province.district)
    province:Province;

    @OneToMany(() => Ward,ward => ward.district)
    ward:Ward[]

    @OneToMany(()=>Orders,orders => orders.district)
    orders:Orders[];

    @OneToMany(()=>User,users => users.district)
    users:User;
}