import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { catchError, EmptyError, from, map, Observable } from 'rxjs';
import { User } from '../../models/user.entity';
import { ILike, In, Like, Not, Raw, Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { MailService } from 'src/service/mail/mail.service';
import { AuthService } from '../auth/auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { updateRoleDto } from './dto/updater-role-user.dto';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';
import { FilterUserDto } from './dto/filter-user.dto';
import { v4 as uuidv4 } from 'uuid';
import { UpdateUserDto } from './dto/update-user.dto';
import { ChangePassworDto } from './dto/dto-change-password.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/password_reset.dto';
import { StripeService } from 'src/service/stripe/stripe.service';
const cryptoRandomString = require('crypto-random-string')
@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly mailService: MailService,
        private readonly authService: AuthService,
        private readonly stripeService:StripeService
    ){}
    async findAll():Promise<User[]>{
        return await this.userRepository.find();
    }
    async managerCustomer(options: IPaginationOptions):Promise<Pagination<User>>{
       return await paginate<User>(this.userRepository,options,{
           where:{roleId:5}
       });
    }
    async managerStaff(options: IPaginationOptions):Promise<Pagination<User>>{
        return await paginate<User>(this.userRepository,options,{
            where:{roleId:Not(5)}
        });
    }
    async findOne(id:number):Promise<User>{
        const user = await this.userRepository.findOne({
            relations:['role','province','district','ward'],
            where:{id:id}
        });
        if(!user)
            throw new NotFoundException({
                code: 404,
                message:"User not found"
            });
        return user;
    }
    async OrderByUser(id:string):Promise<any>{
        return await this.userRepository.find({
            relations:['orders'],
            where: {
                id:id
            }
        })
    }
    async create(user:CreateUserDto):Promise<any>{
        const passwordHash = await this.authService.hashPassword(user.password);
        user.password = passwordHash;
        user.id = uuidv4();
        try{
            const stripeCustomerId = await this.stripeService.createCustomer(user.user_name,user.email);
            user.stripeCustomerId = stripeCustomerId.id;
            const {password, ...newUser} = await this.userRepository.save(user); 
            if(newUser){
                this.mailService.sendUserConfirmation(user.user_name,user.email);
                return newUser;
            }
        }catch(err){
            catchError(err);
        }
    }
    async delete(id:string):Promise<any>{
        return await this.userRepository.delete({id:id});
    }
    async updateInfomationUser(updateUser:UpdateUserDto,userLogin:any):Promise<any>{
        const user = await this.userRepository.findOne({
            where:{id:userLogin.id}
        });
        if (!user)
            throw new NotFoundException({
                code: 404,
                message: "User not found",
            });
        user.user_name = updateUser.user_name;
        user.avatar = updateUser.avatar;
        user.provinceId = updateUser.provinceId;
        user.districtId = updateUser.districtId;
        user.wardId = updateUser.wardId;
        try {
            const {password, ...newUser} = await this.userRepository.save(user);
            return newUser;
        } catch (error) {
            catchError(error)
        }
    }
    async updateRoleUser(id:string,newRole:updateRoleDto):Promise<any>{
        const user = await this.userRepository.findOne(id);
        if(!user){
            throw new NotFoundException({
                code: 404,
                messages:"User not found"
            })
        }
        try {
            user.roleId = newRole.role;
            const {password,...result} = await this.userRepository.save(user);
            return result;
        } catch (error) {
            catchError(error);
        } 
    }
    async updatePassword(changepassword:ChangePassworDto,userLogin:any):Promise<any> {
        const user = await this.userRepository.findOne({id:userLogin.id});
        const booleanPassword = await this.authService.comparePassword(changepassword.old_password,user.password);
        if(!booleanPassword)
            throw new NotFoundException({
                code: 404,
                message:"Old password is incorrect"
            });
        if(changepassword.new_password !== changepassword.confirm_password)
            throw new NotFoundException({
                code: 404,
                message:"New passwords don't match"
            });
        user.password = await this.authService.hashPassword(changepassword.new_password);
        return await this.userRepository.save(user);
    }
    async forgotPassword(forgorPassword: ForgotPasswordDto):Promise<any>{
        const user = await this.userRepository.findOne({
            where:{email:forgorPassword.email}
        });
        if(!user)
            throw new NotFoundException({
                code: 404,
                message: 'Email not found',
            });
        const key = cryptoRandomString({length:50,type: 'alphanumeric'});
        const payload = {key}
        user.forgot_password = key;
        await this.userRepository.save(user);
        const tokenKey = await this.authService.generateJWT_ForgotPassword(payload);
        await this.mailService.sendUserForgotPassword(tokenKey,forgorPassword.email);
        return tokenKey;
    }
    async resetPassword(token:string,reset_password:ResetPasswordDto):Promise<any>{
        const getKey = await this.authService.getToken(token);
        const user = await this.userRepository.findOne({forgot_password: getKey.key});
        if(!user)
            throw new NotFoundException({
                code: 404,
                message:"Verification code already used"
            });
        if(reset_password.password !== reset_password.confirm_password)
            throw new NotFoundException({
                code: 404,
                message:"New passwords don't match"
            });
        user.forgot_password = null;
        user.password = await this.authService.hashPassword(reset_password.password);
        return await this.userRepository.save(user);
    }
    async validateUser(email:string,passwdLogin:string): Promise<User> {
        const userLogin = await this.userRepository.findOne({email});
        if(userLogin){
            const checkPassword = await this.authService.comparePassword(passwdLogin,userLogin.password);
            if(checkPassword) return userLogin;
        }else{
            return null;
        }
    }
    async login(user: LoginUserDto):Promise<any>{
        const userLogin = await this.validateUser(user.email,user.password);
        if(userLogin){
            return {
              access_token: await this.authService.generateJWT_User(userLogin)
            };
        }
        throw new NotFoundException({
            code: 404,
            message: 'Login Failed!'
        });
    }
    async paginate(options: IPaginationOptions):Promise<Pagination<User>>{
        const result = paginate<User>(this.userRepository,options,{
           relations:['role','province','district','ward']
        });
        return result;
    }
    async paginateFilterByUsername(options:IPaginationOptions,user: FilterUserDto): Promise<Pagination<User>>{
        return paginate<User>(this.userRepository,options,{
            where:[
                {user_name: ILike(`%${user.user_name}%`)}
            ]
        });
    }
}