import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class SocketUser{
    @PrimaryGeneratedColumn()
    id:number; 

    @Column()
    socketId:string;

    @Column()
    userId:number;

    @ManyToOne(() => User, user => user.socketUser,{onDelete:"CASCADE"})
    user:User;
}