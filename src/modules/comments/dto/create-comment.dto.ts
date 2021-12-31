import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from "class-validator";
import { Comments } from "src/models/comments.entity";

export class CreateCommentDto{
    userId?:string;

    comment:string;

    replyCmtId?:number;

    star:number;

    reply_comment?:Comments;

    productId?:number;

    img?:string[];
}