import { Logger } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { MessagesService } from 'src/modules/messages/messages.service';
import {ConversationsService } from 'src/modules/conversations/conversations.service'
import { SocketUserService } from 'src/modules/socket-user/socket-user.service';
import { AuthService } from 'src/modules/auth/auth.service';
import { Server, Socket } from 'socket.io';
import { CreateMessageDto } from './dto/create-messages.dto';
@WebSocketGateway()
export class ChatGateway implements OnGatewayInit,OnGatewayConnection,OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('ChatGateway');
  constructor(
    private readonly messageService: MessagesService,
    private readonly conversationService: ConversationsService,
    private readonly socketUserService: SocketUserService,
    private readonly authService:AuthService
  ){}
  async handleConnection(client: Socket) {
    this.logger.log(client.id,'Connected.........');
    // const authToken:any = client.handshake?.query?.token;
    // const payload = await this.authService.getUser(authToken);
    const SocketInformation = {
      userId: 3,
      socketId:client.id
    }
    await this.socketUserService.create(SocketInformation);
  }
  async handleDisconnect(client: Socket) {
    // const authToken:any = client.handshake?.query?.token;
    // const user = await this.authService.getUser(authToken);
    await this.socketUserService.deleteByValue(3,client.id);
  }
  afterInit(server: any) {
    this.logger.log(server,"Init");
  }
  @SubscribeMessage('message')
  async handleMessage(client: Socket, payload: CreateMessageDto){
    const users = await this.conversationService.findUserInConversation(payload.conversationId);
    const dataSocketId = [];
    for(let i=0;i < users.length;i++){
      const socketIds = await this.socketUserService.findSocketUserId(users[i].id);
      socketIds.forEach(socketId => {
        dataSocketId.push(socketId.socketId);
      });
    }
    const createMessage = {
      userId:payload.userId,
      message:payload.message,
      conversationId:payload.conversationId
    }
    const message = await this.messageService.create(createMessage);
    dataSocketId.map((value) => {
      this.server.sockets.emit('message-received',message);
    });
  }
}
