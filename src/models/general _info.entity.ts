import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Products } from "./products.entity";

@Entity()
export class ProductGeneralInfo{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    productDesign:string;

    @Column()
    material:string;

    @Column()
    volume_size:string;

    @Column({type:"date"})
    debut_time:Date;

    @Column()
    productId:number;

    @OneToOne(() => Products,product => product.generalInfo,{onDelete:"CASCADE"})
    @JoinColumn()
    product:Products;
}