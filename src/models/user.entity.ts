import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Messages } from "./messages.entity";
import { ConversationUser } from "./conversation_user.entity";
import { SocketUser } from "./socketUser.entity";
import { Roles } from "./roles.entity";
import { Province } from "./province.entity";
import { District } from "./district.entity";
import { Ward } from "./ward.entity";
import { Comments } from "./comments.entity";
import { Orders } from "./orders.entity";
import { FCM_Token } from "./FCM_token.entity";
import { UserNotification } from "./user_notification.entity";
export enum Login {
    FACEBOOK = 'facebook',
    GOOGLE = 'google',
    USER = 'user'
}
@Entity()
@Unique(['email','phone'])

export class User{
    @PrimaryColumn()
    id:string;

    @Column({unique: false})
    user_name:string;

    @Column('text',{nullable: true})
    password:string;

    @Column({nullable:true})
    phone:string

    @Column({nullable:true})
    email:string;

    @Column({nullable:true})
    avatar:string;

    @Column()
    roleId:number;
    @ManyToOne(() => Roles,role => role.users,{onDelete:"SET NULL"})
    role:Roles;

    @Column({nullable:true})
    provinceId:string;
    @ManyToOne(() => Province,province => province.users,{onDelete:"SET NULL"})
    province:Province;

    @Column({nullable:true})
    districtId:string;
    @ManyToOne(() => District,district => district.users,{onDelete:"SET NULL"})
    district:District;

    @Column({nullable:true})
    wardId:string;
    @ManyToOne(() => Ward,ward => ward.users,{onDelete:"SET NULL"})
    ward:Ward;

    @Column({type: "enum",enum:Login,default:Login.USER})
    login:Login;

    @Column()
    stripeCustomerId:string;
    
    @Column({nullable:true})
    forgot_password:string;

    @OneToMany(() => Messages,message => message.user)
    messages:Messages[];

    @OneToMany(() => ConversationUser,conversationUser => conversationUser.user)
    conversationUser:ConversationUser[];

    @OneToMany(() => SocketUser,socketUser => socketUser.user)
    socketUser:SocketUser[];

    @OneToMany(() => Comments,comments => comments.user)
    comments:Comments[];



    @OneToMany(() => Orders,orders => orders.user)
    orders:Orders[];

    @OneToMany(() => FCM_Token,fcmToken => fcmToken.user)
    fcm_token:FCM_Token[];

    @OneToMany(() =>UserNotification,userNotification => userNotification.user)
    userNotification:UserNotification[];
}