import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Tree, TreeChildren, TreeParent } from "typeorm";
import { CommentImages } from "./comment_image.entity";
import { Products } from "./products.entity";

@Entity()
@Tree("closure-table")
export class Comments{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({length:255})
    customer:string;

    @Column({length:12})
    phone:string;

    @Column()
    email:string;

    @Column('text')
    comment:string;

    @Column('int',{nullable:true})
    star:number;

    @TreeParent({onDelete:"CASCADE"})
    reply_comment:Comments;

    @TreeChildren()
    children:Comments[];

    @Column('int')
    productId:number;

    @ManyToOne(()=>Products,product => product.comments,{onDelete:"CASCADE"})
    product:Products;

    @OneToMany(()=>CommentImages,commentImages => commentImages.comment)
    commentImages:CommentImages[];
}