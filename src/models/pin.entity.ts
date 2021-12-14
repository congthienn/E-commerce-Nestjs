import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Products } from "./products.entity";

@Entity()
@Unique(['name'])
export class Pin{
    @PrimaryGeneratedColumn()
    id:number;
    
    @Column()
    name:string

    @OneToMany(()=>Products,products => products.pin)
    products:Products[];
}