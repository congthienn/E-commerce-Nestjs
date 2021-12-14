import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SocketUser } from 'src/models/socketUser.entity';
import { SocketUserService } from './socket-user.service';

@Module({
  imports: [TypeOrmModule.forFeature([SocketUser])],
  providers: [SocketUserService],
  exports:[SocketUserService]
})
export class SocketUserModule {}
