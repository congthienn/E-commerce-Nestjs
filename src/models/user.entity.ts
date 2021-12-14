import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { UserRole } from "src/modules/user/dto/create-user.dto";
import { Messages } from "./messages.entity";
import { ConversationUser } from "./conversation_user.entity";
import { SocketUser } from "./socketUser.entity";

@Entity()
@Unique(['email','phone'])

export class User{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({unique: true})
    user_name:string;

    @Column()
    password:string;
    
    @Column({type:'enum', enum: UserRole, default:UserRole.USER})
    role: UserRole

    @Column({nullable:false})
    phone:string

    @Column()
    email:string;

    @Column({length: 255})
    address:string;

    @Column({nullable:true})
    avatar:string;

    @OneToMany(() => Messages,message => message.user)
    messages:Messages[];

    @OneToMany(() => ConversationUser,conversationUser => conversationUser.user)
    conversationUser:ConversationUser[];

    @OneToMany(() => SocketUser,socketUser => socketUser.user)
    socketUser:SocketUser[];
}