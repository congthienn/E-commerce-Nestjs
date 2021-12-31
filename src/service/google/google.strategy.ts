import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, VerifyCallback } from "passport-google-oauth20";
import { config } from 'dotenv';
config();
@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy,'google'){
    constructor(
        configService: ConfigService
    ){
        super({
            clientID:configService.get("CLIENT_ID"),
            clientSecret:configService.get("CLIENT_SECRET"),
            callbackURL:configService.get("CALLBACK_URL"),
            scope:['email','profile']
        });
    }
    async validate(accessToken: string, refreshToken: string, profile: any,done: VerifyCallback):Promise<any> {
        const {_json} = profile;
        const user = {_json,accessToken}
        done(null,user);
    }
}