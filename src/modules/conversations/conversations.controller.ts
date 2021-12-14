import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Conversations } from 'src/models/conversation.entity';
import { ConversationsService } from './conversations.service';
import { CreateConversationDto } from './dto/create-conversation.dto';

@Controller('conversations')
export class ConversationsController {
    constructor(
        private readonly conversationsService: ConversationsService
    ){}
    @Get()
    findAll():Promise<Conversations[]>{
        return this.conversationsService.findAllConversation();
    }
    @Get(":id")
    findUserInConversation(@Param('id') id):Promise<any>{
        return this.conversationsService.findUserInConversation(id);
    }
    @Post()
    create(@Body() user:CreateConversationDto):Promise<any>{
        return this.conversationsService.createIndividualConversation(user);
    }
    @Get("user/:id")
    findAllConversationUser(@Param('id') id):Promise<any>{
        return this.conversationsService.findAllConversationUser(id);
    }
}
