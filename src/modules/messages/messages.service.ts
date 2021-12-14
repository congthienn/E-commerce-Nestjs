import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Messages } from 'src/models/messages.entity';
import { Repository } from 'typeorm';
import { CreateMessageDto } from './dto/create-message.dto';

@Injectable()
export class MessagesService {
    constructor(
        @InjectRepository(Messages)
        private readonly messageRepository:Repository<Messages>
    ){}

    async create(message:CreateMessageDto):Promise<Messages>{
        return await this.messageRepository.save(message);
    }

    async findAllMessages(id:string): Promise<any> {
        return await this.messageRepository.find({
            order:{id:"ASC"},
            relations:['user'],
            where:{
                conversationId:id
            }
        });
    }
}
