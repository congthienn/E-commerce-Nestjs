import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UserRole } from './dto/create-user.dto';
import { User } from '../../models/user.entity';
import { LoginUserDto } from './dto/login-user.dto';
import { hasRole } from '../auth/decorator/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { updateRoleDto } from './dto/updater-role-user.dto';
import { Pagination } from 'nestjs-typeorm-paginate';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { editFileName, imageFileFilter } from '../images/file-upload.utils';
import { join } from 'path';
import { AuthService } from '../auth/auth.service';
export const storage = {
    storage: diskStorage({
        destination: './images/user_avatar',
        filename:editFileName
    }),
    fileFilter:imageFileFilter
}
@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService
    ){}

    @hasRole(UserRole.ADMIN) 
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Get()
    async index(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10,
        @Query('user_name') user_name:string
    ): Promise<Pagination<User>>{
        limit = limit > 100 ? 100 : limit;
        if(user_name === null || user_name === undefined){
            return this.userService.paginate(
                { page, limit, route: 'http://localhost:3000/user' },
            );
        }else{
            return this.userService.paginateFilterByUsername(
                { page, limit, route: `http://localhost:3000/user?user_name=${user_name}` },
                { user_name }
            );
        }
    }
    @hasRole(UserRole.ADMIN)
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Get(":email")
    findOne(@Param('email') email):Promise<User>{
        return this.userService.findOne(email);
    }

    @hasRole(UserRole.ADMIN)
    @UseGuards(JwtAuthGuard,RolesGuard)

    @Post()
    @UseInterceptors(FileInterceptor('avatar', storage))
    create(@Body() user:CreateUserDto,@UploadedFile() avatar):Promise<any>{
        if(avatar !== undefined){
            user.avatar = avatar.filename;
        }
        return this.userService.create(user);
    }

    @Post("login")
    login(@Body() user:LoginUserDto):Promise<any>{
        return this.userService.login(user);
    }

    @hasRole(UserRole.ADMIN)
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Put(":email")
    @UseInterceptors(FileInterceptor('avatar', storage))
    update(@Body() user:CreateUserDto,@UploadedFile() avatar,@Param('email') email):Promise<any>{
        if(avatar !== undefined){
            user.avatar = avatar.filename;
        }
        return this.userService.update(user,email);
    }

    @hasRole(UserRole.ADMIN)
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Delete(':id')
    delete(@Param('id') id):Promise<User>{
        return this.userService.delete(id);
    }

    @hasRole(UserRole.ADMIN)
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Put("role/:id")
    updateRoleUser(@Param('id') id,@Body() role:updateRoleDto){
        return this.userService.updateRoleUser(id,role);
    }
    @Get("avatar/:imgpath")
    sendImage(@Param('imgpath') imgpath,@Res() res){
        return res.sendFile(join(process.cwd(), 'images/user_avatar/' + imgpath));
    }
    @Get("token/:id")
    getUser(@Param("id") token):Promise<any>{
        return this.authService.getUser(token);
    }
}