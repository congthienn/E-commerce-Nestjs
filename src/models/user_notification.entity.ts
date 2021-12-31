import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import {Notification} from "./notification.entity";
@Entity()
export class UserNotification{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({default:false})
    seend:boolean;

    @Column()
    userId:string;
    @ManyToOne(() => User,user => user.userNotification,{onDelete:"CASCADE"})
    user:User;

    @Column()
    notificationId:string;
    @ManyToOne(() => Notification,notification => notification.userNotification,{onDelete:"CASCADE"})
    notification:Notification;
}