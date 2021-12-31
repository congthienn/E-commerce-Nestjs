import { Body, Controller, createParamDecorator, Delete, ExecutionContext, Get, Param, Post, Put, Query, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UserRole } from './dto/create-user.dto';
import { User } from '../../models/user.entity';
import { LoginUserDto } from './dto/login-user.dto';
import { hasPermission } from '../auth/decorator/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { updateRoleDto } from './dto/updater-role-user.dto';
import { Pagination } from 'nestjs-typeorm-paginate';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { editFileName, imageFileFilter } from '../images/file-upload.utils';
import { join } from 'path';
import { AuthService } from '../auth/auth.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ChangePassworDto } from './dto/dto-change-password.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/password_reset.dto';
export const storage = {
    storage: diskStorage({
        destination: './images/user_avatar',
        filename:editFileName
    }),
    fileFilter:imageFileFilter
}
export const GetUser = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
      const request = ctx.switchToHttp().getRequest();
      return request.user;
    },
  );
@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService
    ){}

    @hasPermission("GET_USER") 
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
                { page, limit, route: 'http://localhost:3000/user' }
            );
        }else{
            return this.userService.paginateFilterByUsername(
                { page, limit, route: `http://localhost:3000/user?user_name=${user_name}` },
                { user_name }
            );
        }
    }

    @hasPermission('USER_MANAGER_CUSTOMER')
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Get("customer")
    managerCustomer(
        @Query('limit') limit: number = 10,
        @Query('page') page: number = 1
    ):Promise<Pagination<User>>{
        limit = limit > 100 ? 100 : limit;
        return this.userService.managerCustomer({page,limit,route:'http://localhost:3000/user/customer'});
    }
    
    @hasPermission("USER_MANAGER_STAFF")
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Get('staff')
    managerStaff(
        @Query('limit') limit: number = 10,
        @Query('page') page: number = 1
    ):Promise<Pagination<User>>{
        return this.userService.managerStaff({page,limit,route:'http://localhost:3000/user/staff'});
    }

    @hasPermission("GET_USER")
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Get("information/:id")
    findOne(@Param('id') id):Promise<User>{
        return this.userService.findOne(id);
    }

    @Get("/order/:id")
    OrderByUser(@Param('id') id):Promise<any>{
        return this.userService.OrderByUser(id);
    }

    @hasPermission("POST_USER")
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Post()
    @UseInterceptors(FileInterceptor('avatar', storage))
    create(@Body() user:CreateUserDto,@UploadedFile() avatar):Promise<any>{
        if(avatar !== undefined){
            user.avatar = avatar.filename;
        }
        return this.userService.create(user);
    }

    @hasPermission("PUT_USER")
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Put("update/")
    @UseInterceptors(FileInterceptor('avatar', storage))
    update(@Body() update:UpdateUserDto,@UploadedFile() avatar,@GetUser() user):Promise<any>{
        if(avatar !== undefined){
            user.avatar = avatar.filename;
        }
        return this.userService.updateInfomationUser(update,user);
    }

    @hasPermission("DELETE_USER")
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Delete(':id')
    delete(@Param('id') id):Promise<User>{
        return this.userService.delete(id);
    }

    @hasPermission("PUT_ROLE_USER")
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Put("role/:id")
    updateRoleUser(@Param('id') id, @Body() role:updateRoleDto){
        return this.userService.updateRoleUser(id,role);
    }
    
    @Get("token/:token")
    getUser(@Param("token") token):Promise<any>{
        return this.authService.getToken(token);
    }

    @UseGuards(JwtAuthGuard)
    @Put('change-password')
    updatePassword(@GetUser() user,@Body() changepassword:ChangePassworDto):Promise<any>{
        return this.userService.updatePassword(changepassword,user)
    }
    
    @Post("forgot_password")
    forgot_password(@Body() forgotPassword:ForgotPasswordDto):Promise<any>{
        return this.userService.forgotPassword(forgotPassword);
    }
    @Post("forgot_password/:token")
    reset_password(@Param('token') token,@Body() reset_password:ResetPasswordDto):Promise<any>{
        return this.userService.resetPassword(token,reset_password);
    }
}