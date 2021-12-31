import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User,Login } from 'src/models/user.entity';
import { AuthService } from 'src/modules/auth/auth.service';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { MailService } from '../mail/mail.service';
import { StripeService } from '../stripe/stripe.service';
@Injectable()
export class GoogleService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private mailService: MailService,
        private readonly authService: AuthService,
        private readonly stripeService: StripeService
    ){}
    async resquestUser(req){
        const user = await req.user;
        const findUserByEmail = await this.userRepository.findOne({
            where:{email: user._json.email}
        });
        if(findUserByEmail)
            return await this.authService.generateJWT_User(findUserByEmail)
        const id = uuidv4();
        const stripeCustomerId = await this.stripeService.createCustomer(user._json.name,user._json.email)
        const createUser = {
            id: id,
            user_name:<string>user._json.name,
            email:<string>user._json.email,
            avatar:<string>user._json.picture,
            login:Login.GOOGLE,
            roleId:5,
            stripeCustomerId:stripeCustomerId.id
        }
        const response = await this.userRepository.save(createUser);
        await this.mailService.sendUserConfirmation(response.user_name,response.email);
        return await this.authService.generateJWT_User(response);
    }
}