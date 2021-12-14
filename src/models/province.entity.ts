import { Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { District } from "./district.entity";
import { Orders } from "./orders.entity";

@Entity()
export class Province{
    @PrimaryColumn({length:6})
    id:string;

    @Column({length:255})
    name:string;

    @Column({length:255})
    type:string;

    @OneToMany(() => District,district => district.province)
    district:District[];

    @OneToMany(()=>Orders,orders => orders.province)
    orders:Orders[];
}