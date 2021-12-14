import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Comments } from "./comments.entity";

@Entity()
export class CommentImages{
    @PrimaryGeneratedColumn()
    id:number;

    @Column('text')
    img:string

    @Column()
    commentId:number;

    @ManyToOne(()=>Comments,comment=>comment.commentImages,{onDelete:"CASCADE"})
    comment:Comments;
}