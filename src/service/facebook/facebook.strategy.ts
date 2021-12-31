import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-facebook';
import { VerifyCallback } from 'passport-google-oauth20';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
    constructor(
        configService:ConfigService
    ){
        super({
        clientID: configService.get("FB_APP_ID"),
        clientSecret: configService.get("FB_APP_SECRET"),
        callbackURL: configService.get("FB_CALLBACK_URL"),
        scope: 'email',
        profileFields: ['emails','name','photos','id'],
        });
    }
    
    async validate(accessToken: string,refreshToken: string,profile: any,done:VerifyCallback): Promise<any> {
        const result = {profile,accessToken}
        done(null, result);
    }
}