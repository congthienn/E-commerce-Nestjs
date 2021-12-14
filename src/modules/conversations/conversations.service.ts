import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
const cryptoRandomString = require('crypto-random-string')
import { Conversations } from 'src/models/conversation.entity';
import { ConversationUser } from 'src/models/conversation_user.entity';
import { User } from 'src/models/user.entity';
import { Repository } from 'typeorm';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { UpdateTitleConversationDto } from './dto/update-title-conversation.dto';

@Injectable()
export class ConversationsService {
    constructor(
        @InjectRepository(Conversations)
        private readonly conversationRepository:Repository<Conversations>,
        @InjectRepository(ConversationUser)
        private readonly conversationUserRepository:Repository<ConversationUser>,
        @InjectRepository(User)
        private readonly userRepository:Repository<User>

    ){}
    async findAllConversation():Promise<Conversations[]>{
        return await this.conversationRepository.find();
    }
    async createIndividualConversation(conversation:CreateConversationDto):Promise<any>{
        const createConversationDto = {
            id:cryptoRandomString({length:10,type:'alphanumeric'}).toLocaleUpperCase()
        }
        const renderName = await this.userRepository.findOne(conversation.sender);
        const receiverName = await this.userRepository.findOne(conversation.receiver);
        const result = {
            title:[renderName.user_name,receiverName.user_name],
            userId:[conversation.receiver,conversation.sender]
        }
        const createConversation = await this.conversationRepository.save(createConversationDto);
        for(let i=0;i<result.userId.length;i++){
            const conversationUser = {
                title:result.title[i],
                userId:result.userId[i],
                conversationId:createConversation.id
            }
            await this.conversationUserRepository.save(conversationUser);
        }
    }
    async delete(id:string):Promise<any>{
        return await this.conversationRepository.delete(id);
    }
    async findAllConversationUser(id:number):Promise<any>{
        return await this.conversationUserRepository.find({
            relations:['conversation'],
            where:{
                userId:id
            }
        })
    }
    async findUserInConversation(id:string):Promise<any>{
        return await this.conversationUserRepository.find({
            where:{conversationId:id}
        });
    }
    async updateTileConversation(newTitle : UpdateTitleConversationDto):Promise<ConversationUser>{
        const conversation = await this.conversationUserRepository.findOne({
            where:{
                userId:newTitle.userId,
                conversationId:newTitle.conversationId
            }
        });
        conversation.title = newTitle.title;
        return await this.conversationUserRepository.save(conversation);
    }
}