import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Products } from "./products.entity";

@Entity()
@Unique(['promotion_form','productId'])
export class Promotion{
    @PrimaryGeneratedColumn()
    id:number;

    @Column('text')
    promotion_form:string;

    @Column({type:"date",nullable:true})
    time:Date;

    @Column()
    productId:number;

    @ManyToOne(()=>Products,products => products.promotion,{onDelete:"CASCADE"})
    product:Products;
}