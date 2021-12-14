import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Products } from "./products.entity";

@Entity()
export class ProductPinInfo{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    capacity:string;

    @Column()
    pin_type:string;

    @Column()
    maximum_support:string;

    @Column()
    pin_technology:string;

    @Column()
    charging_port:string;

    @Column()
    productId:number;

    @OneToOne(()=>Products,product => product.pinInfo,{onDelete:"CASCADE"})
    @JoinColumn()
    product:Products;
}