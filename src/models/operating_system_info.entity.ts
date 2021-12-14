import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Products } from "./products.entity";

@Entity()
export class ProductOperatingSystemInfo{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    operatingSystem:string;

    @Column()
    CPU:string;

    @Column()
    CPU_speed:string;

    @Column()
    GPU:string;

    @Column()
    productId:number;
    
    @OneToOne(()=>Products,product => product.operatingSystemInfo,{onDelete:"CASCADE"})
    @JoinColumn()
    product:Products;
}