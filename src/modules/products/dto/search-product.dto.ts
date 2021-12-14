import { IsString } from "class-validator";

export class SearchProductByName{
    @IsString()
    name:string;
}