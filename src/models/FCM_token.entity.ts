import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { User } from "./user.entity";

@Unique(['FCM_registration_token','userId'])
@Entity()
export class FCM_Token{
    @PrimaryGeneratedColumn()
    id:number;

    @Column('text')
    FCM_registration_token:string;

    @Column()
    userId:string;

    @ManyToOne(() => User,user => user.fcm_token,{onDelete:"CASCADE"})
    user:User;
}