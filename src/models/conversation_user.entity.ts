import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Conversations } from "./conversation.entity";
import { User } from "./user.entity";

@Entity()
export class ConversationUser{
    @PrimaryGeneratedColumn()
    id:number;

    @Column('text')
    title:string;

    @Column()
    userId:number;

    @ManyToOne(() => User,user => user.conversationUser,{onDelete:"CASCADE"})
    user:User;

    @Column()
    conversationId:string;

    @ManyToOne(() => Conversations,conversation => conversation.conversationUser,{onDelete:"CASCADE"})
    conversation:Conversations;
}