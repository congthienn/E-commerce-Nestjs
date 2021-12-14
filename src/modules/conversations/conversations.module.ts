import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Conversations } from 'src/models/conversation.entity';
import { ConversationUser } from 'src/models/conversation_user.entity';
import { User } from 'src/models/user.entity';
import { ConversationsService } from './conversations.service';
import { ConversationsController } from './conversations.controller';

@Module({
  imports:[TypeOrmModule.forFeature([Conversations,ConversationUser,User])],
  providers: [ConversationsService],
  exports:[ConversationsService],
  controllers: [ConversationsController]
})
export class ConversationsModule {}
