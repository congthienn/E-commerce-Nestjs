import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';
import { join } from 'path';
import { Comments } from 'src/models/comments.entity';
import { CommentImages } from 'src/models/comment_image.entity';
import { Repository, TreeRepository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentsService {
    constructor(
        @InjectRepository(Comments)
        private readonly commentsRepository:TreeRepository<Comments>,
        @InjectRepository(CommentImages)
        private readonly cmtImageRepository:Repository<CommentImages>
    ){}
    async findAll(options:IPaginationOptions,productId:number):Promise<Pagination<any>>{
        return await paginate<Comments>(this.commentsRepository,options,{
            relations:['commentImages'],
            where:{
                productId:productId,
                reply_comment:null
            }
        })
    }
    async commentInComments(id:number):Promise<Comments>{
        const commentParent = await this.commentsRepository.findOne({
            where:{id:id},
            relations:['commentImages']
        });
        return await this.commentsRepository.findDescendantsTree(commentParent,{relations:['commentImages']});
    }
    async create(comment:CreateCommentDto):Promise<any>{
        const replyComment = await this.commentsRepository.findOne({
            where:{id:comment.replyCmtId}
        });
        comment.reply_comment = replyComment;
        const resultComment = await this.commentsRepository.save(comment);
        const imgs=[];
        if(comment.img !== undefined){
            const arrayImg = comment.img;
            for(let i=0;i<arrayImg.length;i++){
                const imgDto = {
                    img:arrayImg[i],
                    commentId:resultComment.id
                }
                imgs.push(await this.cmtImageRepository.save(imgDto));
            }
        }
        return {...resultComment,...imgs};
    }
    async deleteImage(id:number):Promise<any>{
        const img = await this.cmtImageRepository.findOne(id);
        const fs = require('fs');
        fs.unlinkSync(join(process.cwd(),'images/comments/'+img.img));
        return await this.cmtImageRepository.delete(id);
    }
    async delete(id:number):Promise<any>{
        const cmtImages = await this.cmtImageRepository.find({
            where: {commentId:id}
        });
        const fs = require('fs');
        if(cmtImages){
            cmtImages.forEach(item => {
                fs.unlinkSync(join(process.cwd(),'images/comments/'+item.img));
            })
        }
        return await this.commentsRepository.delete(id);
    }
    async update(id:number,comment:CreateCommentDto):Promise<Comments>{
        const cmt = await this.commentsRepository.findOne({id});
        const fs = require('fs');
        const imgs=[];
        if(comment.img !== undefined){
            const cmtImages = await this.cmtImageRepository.find({
                where: {commentId:id}
            });
            if(cmtImages){
                cmtImages.forEach(item => {
                    fs.unlinkSync(join(process.cwd(),'images/comments/'+item.img));
                });
            }
            const del = await this.cmtImageRepository.delete({commentId:id})
            const arrayImg = comment.img;
            for(let i= 0;i<arrayImg.length;i++){
                const imgDto = {
                    img:arrayImg[i],
                    commentId:id
                }
                imgs.push(await this.cmtImageRepository.save(imgDto));
            }
        }
        cmt.comment = comment.comment;
        cmt.star = comment.star;
        cmt.customer = comment.customer;
        cmt.email = comment.email;
        cmt.phone = comment.phone;
        return await this.commentsRepository.save(cmt);
    }
}