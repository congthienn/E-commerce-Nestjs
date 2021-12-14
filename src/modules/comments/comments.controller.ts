import { Body, Controller, Delete, Get, Param, Post, Put, Query, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Comments } from 'src/models/comments.entity';
import { editFileName, imageFileFilter } from '../images/file-upload.utils';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
export const storage = {
    storage: diskStorage({
        destination: './images/comments',
        filename: editFileName
    }),
    fileFilter:imageFileFilter
}
@Controller('comments')
export class CommentsController {
    constructor(
        private readonly commentsService: CommentsService
    ){}
  
    @Get(":id")
    findAll(
        @Param("id") id,
        @Query('page') page: number = 1,
        @Query('limit') limit:number = 10
    ):Promise<Pagination<any>>{
        limit = limit > 100 ? 100 : limit;
        return this.commentsService.findAll({limit,page,route:'http://localhost:3000/comments'},id)
    }

    @Get("reply/:id")
    comments(@Param('id') id):Promise<Comments>{
        return this.commentsService.commentInComments(id);
    }

    @UseInterceptors(FilesInterceptor('images',20,storage))
    @Post()
    create(@Body() comment:CreateCommentDto,@UploadedFiles() images):Promise<any>{
        const arrayImgs = [];
        if(images !== undefined){
            images.forEach(item => {
                arrayImgs.push(item.filename)
            });
        }
        comment.img = arrayImgs;
        return this.commentsService.create(comment)
    }

    @Delete(":id")
    delete(@Param("id") id):Promise<any>{
        return this.commentsService.delete(id);
    }
    @Delete("img/:id")
    deleteImg(@Param("id") id):Promise<any>{
        return this.commentsService.deleteImage(id);
    }
    
    @UseInterceptors(FilesInterceptor('images',20,storage))
    @Put(":id")
    update(@Param('id') id,@Body() comment:CreateCommentDto,@UploadedFiles() images):Promise<any>{
        const arrayImgs = [];
        if(images !== undefined){
            images.forEach(item => {
                arrayImgs.push(item.filename)
            });
        }
        comment.img = arrayImgs;
        return this.commentsService.update(id,comment);
    }
}
