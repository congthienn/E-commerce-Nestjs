import { Entity,Column,PrimaryGeneratedColumn, Unique, OneToMany } from "typeorm";
import { Products } from "./products.entity"; 


@Entity()
@Unique(['category_name'])
export class Categories{
    @PrimaryGeneratedColumn()
    id:number;

    @Column('text')
    category_name:string;

    @OneToMany(()=> Products,products => products.category)
    products:Products[];
}
