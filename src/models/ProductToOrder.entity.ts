import { memory } from "src/modules/product-type/dto/update-product-type.dto";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Orders } from "./orders.entity";
import { ProductType } from "./product_type.entity";
@Entity()
export class ProductToOrder{
    @PrimaryGeneratedColumn()
    id:number;

    @Column('int')
    quantity:number;

    @Column()
    productTypeId:number;
    @ManyToOne(()=>ProductType,productType => productType.productToorder)
    productType:ProductType;

    @Column()
    orderId:string;
    @ManyToOne(()=>Orders,order => order.productToorder,{onDelete:"CASCADE"})
    order:Orders;
}