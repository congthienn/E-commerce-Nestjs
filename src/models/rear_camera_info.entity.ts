import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Products } from "./products.entity";

@Entity()
export class ProductRearCameraInfo{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    camera_resolution:string;

    @Column()
    film:string;

    @Column()
    flash_light:string;

    @Column()
    feature:string;

    @Column()
    productId:number;
    
    @OneToOne(()=>Products,product => product.rearCameraInfo,{onDelete:"CASCADE"})
    @JoinColumn()
    product:Products;
}