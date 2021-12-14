import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { Comments } from 'src/models/comments.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentImages } from 'src/models/comment_image.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Comments,CommentImages])],
  providers: [CommentsService],
  controllers: [CommentsController]
})
export class CommentsModule {}
