import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Products } from "./products.entity";
import { PhoneType } from "src/modules/product-information/dto/create-productinfo.dto";
@Entity()
@Unique(['productId'])
export class ProductInformation{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    screen:string;

    @Column({type:'enum',enum:PhoneType})
    type:PhoneType;

    @Column({length:255})
    operating_system:string

    @Column({length:10})
    ram:string

    @Column({length:255})
    rear_camera:string;

    @Column({length:255})
    front_camera:string;

    @Column({length:255})
    chip:string;

    @Column({length:255})
    sim:string;

    @Column()
    productId:number;

    @OneToOne(() => Products,product => product.productInformation,{onDelete:"CASCADE"})
    @JoinColumn()
    product:Products
}