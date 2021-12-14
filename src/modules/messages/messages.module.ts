import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Messages } from 'src/models/messages.entity';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';

@Module({
  imports:[TypeOrmModule.forFeature([Messages])],
  providers: [MessagesService],
  exports:[MessagesService],
  controllers: [MessagesController]
})
export class MessagesModule {}
