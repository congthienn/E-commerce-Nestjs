import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { catchError, EmptyError, from, map, Observable } from 'rxjs';
import { User } from '../../models/user.entity';
import { ILike, Like, Raw, Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { MailService } from 'src/service/mail/mail.service';
import { AuthService } from '../auth/auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { updateRoleDto } from './dto/updater-role-user.dto';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';
import { FilterUserDto } from './dto/filter-user.dto';
@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly mailService: MailService,
        private readonly authService: AuthService
    ){}
    async findAll():Promise<User[]>{
        return await this.userRepository.find({
            select:['id','user_name','email','phone','address','role']
        });
    }
    async findOne(email:string):Promise<User>{
        const user = await this.userRepository.findOne({
            select:['id','user_name','email','phone','address','role'],
            where:{email:email}
        });
        if(!user)
            throw new NotFoundException({
                code: 404,
                message:"User not found"
            });
        return user;
    }
    async create(user:CreateUserDto):Promise<any>{
        const passwordHash = await this.authService.hashPassword(user.password);
        user.password = passwordHash;
        try{ 
            const {password, ...newUser} = await this.userRepository.save(user); 
            if(newUser){
                this.mailService.sendUserConfirmation(user);
                return newUser;
            }
        }catch(err){
            catchError(err);
        }
    }
    async delete(id:number):Promise<any>{
        return await this.userRepository.delete({id:id}); 
    }
    async update(newUser:CreateUserDto,email:string):Promise<any>{
        const user = await this.userRepository.findOne({
            where:{email:email}
        });
        if (!user)
            throw new NotFoundException({
                code: 404,
                message: "User not found",
            });
        user.user_name = newUser.user_name;
        user.phone = newUser.phone;
        user.email = newUser.email;
        user.address = newUser.address;
        user.password = await this.authService.hashPassword(newUser.password);
        user.avatar = newUser.avatar;
        try {
            const {password, ...newUser} = await this.userRepository.save(user);
            return newUser;
        } catch (error) {
            catchError(error)
        }
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
    async updateRoleUser(id:number,newRole:updateRoleDto):Promise<any>{
        const user = await this.userRepository.findOne(id);
        if(!user){
            throw new NotFoundException({
                code: 404,
                messages:"User not found"
            })
        }
        user.role = newRole.role;
        try {
            const {password,...result} = await this.userRepository.save(user);
            return result;
        } catch (error) {
            catchError(error);
        } 
    }
    async paginate(options: IPaginationOptions):Promise<Pagination<User>>{
        return paginate<User>(this.userRepository,options,{
            order: {id: "ASC"},
            select:['id','user_name','email','phone','address','role','avatar'],
        });
    }
    async paginateFilterByUsername(options:IPaginationOptions,user: FilterUserDto): Promise<Pagination<User>>{
        return paginate<User>(this.userRepository,options,{
            order: {id: "ASC"},
            select:['id','user_name','email','phone','address','role'],
            where:[
                {user_name: ILike(`%${user.user_name}%`)}
            ]
        });
    }
}