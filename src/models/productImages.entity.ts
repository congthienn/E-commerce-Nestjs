import { Column,Entity,JoinColumn,ManyToOne,PrimaryGeneratedColumn } from "typeorm";
import { Products } from "./products.entity";

@Entity()
export class productImages{
    @PrimaryGeneratedColumn()
    id:number;

    @Column('text')
    image_path:string;

    @Column()
    productId:number;
    @ManyToOne(()=> Products, product => product.productImages,{onDelete:"CASCADE"})
    product:Products;
}