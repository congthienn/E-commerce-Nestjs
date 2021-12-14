import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Conversations } from "./conversation.entity";
import { User } from "./user.entity";

@Entity()
export class Messages{
    @PrimaryGeneratedColumn()
    id:number;

    @Column('text')
    message:string;

    @Column({name:"create_at",type:"timestamp",default:() => "CURRENT_TIMESTAMP"})
    createAt:Date;

    @Column()
    userId:number;

    @ManyToOne(() => User,user => user.messages,{onDelete:"CASCADE"})
    user:User;

    @Column()
    conversationId:string;

    @ManyToOne(() => Conversations,conversation => conversation.messages,{onDelete:"CASCADE"})
    conversation:Conversations;

    
}