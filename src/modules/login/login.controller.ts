import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FacebookService } from 'src/service/facebook/facebook.service';
import { GoogleService } from 'src/service/google/google.service';
import { LoginUserDto } from '../user/dto/login-user.dto';
import { UserService } from '../user/user.service';

@Controller('')
export class LoginController {
    constructor(
        private readonly googleService: GoogleService,
        private readonly facebookService: FacebookService,
        private readonly userService: UserService
    ){}

    @Get('login/google')
    @UseGuards(AuthGuard('google'))
    async googleAuth(@Req() req){}
    
    @Get('auth/google/callback')
    @UseGuards(AuthGuard('google'))
    googleAuthRedirect(@Req() req) {
        return this.googleService.resquestUser(req);
    }

    @Get("login/facebook")
    @UseGuards(AuthGuard('facebook'))
    async facebookLogin(@Req() req){}

    @Get('facebook/callback')
    @UseGuards(AuthGuard('facebook'))
    facebookRedirect(@Req() req) {
        return this.facebookService.resquestUser(req);
    }

    @Post("login")
    login(@Body() user:LoginUserDto):Promise<any>{
        return this.userService.login(user);
    }
}