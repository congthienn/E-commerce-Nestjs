import { IsNotEmpty } from "class-validator";

export class UpdateTitleConversationDto{
    userId:number;
    conversationId:string;

    @IsNotEmpty()
    title:string;
}