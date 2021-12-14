import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn} from "typeorm";
import { ConversationUser } from "./conversation_user.entity";
import { Messages } from "./messages.entity";

@Entity()
export class Conversations{
    @PrimaryColumn({length:10})
    id:string

    @Column({name:"create_at",type:"timestamp",default:()=>"CURRENT_TIMESTAMP"})
    createAt:Date;
    
    @OneToMany(() => Messages,messages => messages.conversation)
    messages:Messages[];

    @OneToMany(() => ConversationUser,conversationUser => conversationUser.conversation)
    conversationUser:ConversationUser[];
}