import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Messages } from 'src/models/messages.entity';
import { CreateMessageDto } from './dto/create-message.dto';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
    constructor(
        private readonly messagesService: MessagesService
    ){}
    @Get(":id")
    findAll(@Param('id') id):Promise<Messages[]>{
        return this.messagesService.findAllMessages(id);
    }
    @Post()
    create(@Body() message:CreateMessageDto):Promise<any>{
        return this.messagesService.create(message);
    }
}