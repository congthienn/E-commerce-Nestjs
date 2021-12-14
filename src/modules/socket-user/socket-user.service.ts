import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SocketUser } from 'src/models/socketUser.entity';
import { Repository } from 'typeorm';
import { CreateSocketUser } from './dto/create-socketUser.dto';

@Injectable()
export class SocketUserService {
    constructor(
        @InjectRepository(SocketUser)
        private readonly socketUserRepository:Repository<SocketUser>
    ){}
    async create(socketUser:CreateSocketUser):Promise<SocketUser>{
        return await this.socketUserRepository.save(socketUser);
    }
    async findSocketUserId(id:number):Promise<SocketUser[]>{
        return await this.socketUserRepository.find({
            relations:['user'],
            where:{
                user:{id:id}
            }
        });
    }
    async deleteByValue(userId:number,socketId:string):Promise<any>{
        const result = await this.socketUserRepository.findOne({
            relations:['user'],
            where:{
                socketId:socketId,
                user:{id:userId}
            }
        });
        return await this.socketUserRepository.delete(result.id);
    }
}