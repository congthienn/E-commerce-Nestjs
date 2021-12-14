import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from "class-validator";
import { Comments } from "src/models/comments.entity";

export class CreateCommentDto{
    @IsString()
    @IsNotEmpty()
    customer:string

    @IsPhoneNumber()
    @IsNotEmpty()
    phone:string;

    @IsEmail()
    @IsNotEmpty()
    email:string;

    comment:string;

    replyCmtId?:number;

    star:number;

    reply_comment?:Comments;

    productId:number;

    img?:string[]
}