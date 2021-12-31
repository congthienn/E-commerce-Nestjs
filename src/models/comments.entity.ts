import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, Tree, TreeChildren, TreeParent } from "typeorm";
import { CommentImages } from "./comment_image.entity";
import { Products } from "./products.entity";
import { User } from "./user.entity";

@Entity()
@Tree("closure-table")
export class Comments{
    @PrimaryGeneratedColumn()
    id:number;

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

    @Column()
    userId:string;
    @ManyToOne(()=> User,user => user.comments,{onDelete:"SET NULL"})
    user:User;
}