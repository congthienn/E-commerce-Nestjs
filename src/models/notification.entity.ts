import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { UserNotification } from "./user_notification.entity";

@Entity()
export class Notification{
    
    @PrimaryColumn()
    id:string;

    @Column('text')
    title:string;

    @Column('text')
    body:string;

    @Column('timestamp',{default:() =>"CURRENT_TIMESTAMP"})
    time:Date;

    @OneToMany(() => UserNotification,userNotification => userNotification.notification)
    userNotification:UserNotification[];
}