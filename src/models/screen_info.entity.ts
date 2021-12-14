import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Products } from "./products.entity";

@Entity()
export class ProductScreenInfo{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({length: 255})
    screen_technology:string;

    @Column({length:255})
    resolution:string;

    @Column({length:255})
    widescreen:string;

    @Column({length:255})
    maximum_light:string;

    @Column({length:255})
    touch_screen:string;

    @Column()
    productId:number;
    
    @OneToOne(() => Products,product => product.screenInfo,{onDelete:"CASCADE"})
    @JoinColumn()
    product:Products;
}