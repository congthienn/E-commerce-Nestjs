import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Orders } from "./orders.entity";

@Entity()
@Unique(['formality'])
export class Payments{
    @PrimaryGeneratedColumn()
    id:number;

    @Column('text')
    formality:string;

    @OneToMany(()=>Orders,orders => orders.payment)
    orders:Orders[];
}