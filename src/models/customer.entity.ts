import { Column, Entity,PrimaryGeneratedColumn, Unique} from "typeorm";


@Entity()
export class Customer{
    @PrimaryGeneratedColumn()
    id:number; 

    @Column('text',{nullable:true})
    name:string;

    @Column({unique:true}) 
    phoneNumber:string;

    @Column({length:255,unique:true})
    email:string;

    @Column('text')
    address:string;
    
    @Column({length:255})
    password:string;
}