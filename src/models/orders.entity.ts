import { Order_Status, Pay_Status } from "src/modules/orders/dto/create-order.dto";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { District } from "./district.entity";
import { Payments } from "./payments.entity";
import { ProductToOrder } from "./ProductToOrder.entity";
import { Province } from "./province.entity";
import { User } from "./user.entity";
import { Ward } from "./ward.entity";

@Entity()
export class Orders{
    @PrimaryColumn({length: 15})
    id:string;

    @Column('int')
    price:number;

    @Column()
    userId:string;
    @ManyToOne(() => User,user => user.orders,{onDelete:"SET NULL"})
    user:User

    @Column()
    phone:string;

    @Column({type:'timestamp',default:()=>"CURRENT_TIMESTAMP"})
    time_create:Date;

    @Column({type:"date",nullable:true})
    delivery_time:Date;

    @Column()
    paymentId:number;
    @ManyToOne(()=>Payments,payment => payment.orders,{onDelete:"SET NULL"})
    payment:Payments;

    @Column({type:"enum",enum:Order_Status,default:Order_Status.Wait})
    order_status:Order_Status;

    @Column({type:"enum",enum:Pay_Status,default:Pay_Status.Unpaid})
    pay_status:Pay_Status;

    @Column('text')
    adress:string;

    @Column()
    provinceId:number;
    @ManyToOne(()=>Province,province => province.orders,{onDelete:"SET NULL"})
    province:Province;

    @Column()
    districtId:number;
    @ManyToOne(()=>District,district=>district.orders,{onDelete:"SET NULL"})
    district:District;

    @Column()
    wardId:number;
    @ManyToOne(() => Ward,ward => ward.orders,{onDelete:"SET NULL"})
    ward:Ward;

    @Column({default:false})
    orderOnline:boolean;

    @OneToMany(() => ProductToOrder,productToorder => productToorder.order)
    productToorder:ProductToOrder[];
}