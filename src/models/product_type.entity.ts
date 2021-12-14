import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, Unique } from "typeorm";
import { memory } from "src/modules/product-type/dto/create-product-type.dto";
import { Products } from "./products.entity";
import { ProductToOrder } from "./ProductToOrder.entity";


@Entity()
@Unique(['productId','memory'])
export class ProductType{
    @PrimaryGeneratedColumn()
    id:number; 

    @Column({nullable: false})
    productId:number;

    @ManyToOne(()=>Products,products=>products.productType,{onDelete:"CASCADE"})
    product:Products;

    @Column({type:'enum',enum:memory})
    memory:memory;

    @Column('int')
    price:number;

    @Column('int')
    quantity:number;

    @Column('int',{default:0})
    sold:number;

    @OneToMany(()=>ProductToOrder,productToorder => productToorder.productType)
    productToorder:ProductToOrder[];
}