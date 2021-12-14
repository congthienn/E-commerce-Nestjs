import { Module } from '@nestjs/common';
import { ConversationsModule } from 'src/modules/conversations/conversations.module';
import { ChatGateway } from './chat.gateway';
import {MessagesModule } from 'src/modules/messages/messages.module';
import {SocketUserModule} from 'src/modules/socket-user/socket-user.module';
import { UserModule } from 'src/modules/user/user.module';
import { AuthModule } from 'src/modules/auth/auth.module';
@Module({})
export class ChatModule {
    imports:[
        ConversationsModule,MessagesModule,SocketUserModule,AuthModule,
    ]
    providers: [ChatGateway]
}
