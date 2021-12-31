import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { District } from "./district.entity";
import { Orders } from "./orders.entity";
import { User } from "./user.entity";

@Entity()
export class Ward{
    @PrimaryColumn({length:6})
    id:string;

    @Column({length:255})
    name:string; 

    @Column({length:255})
    type:string;

    @Column()
    districtId:string;

    @ManyToOne(() => District,district => district.ward)
    district:District

    @OneToMany(()=>Orders,orders => orders.ward)
    orders:Orders[];

    @OneToMany(()=>User,users => users.ward)
    users:User
}