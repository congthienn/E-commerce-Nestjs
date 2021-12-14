import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Customer } from 'src/models/customer.entity';
import { User } from 'src/models/user.entity';
import { ConfigService } from '@nestjs/config';
const bcrypt = require('bcrypt');
@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
    ){}
    async generateJWT_User(user: User):Promise<String>{
        const {password,...payload} = user;
        return await this.jwtService.signAsync(payload);
    }

    async generateJWT_Customer(customer: Customer):Promise<String>{
        const {password,...payload} = customer;
        return await this.jwtService.signAsync(payload);
    }

    async hashPassword(password: string):Promise<string>{
        return await <string>bcrypt.hash(password,12);
    }
    
    async comparePassword(PasswordLogin:string,passwdHash:string):Promise<String>{
        return await bcrypt.compare(PasswordLogin,passwdHash);
    }

    async getUser(token:string):Promise<any>{
        return await this.jwtService.verify(token,{secret:this.configService.get('JWT_SECRET')});
    }
}