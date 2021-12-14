import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Products } from "./products.entity";

@Entity()
@Unique(['name'])
export class DesignScreen{
    @PrimaryGeneratedColumn()
    id:number;
    
    @Column('text')
    name:string

    @OneToMany(()=>Products,products=>products.designScreen)
    products:Products[]
}