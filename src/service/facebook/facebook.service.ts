import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User,Login } from 'src/models/user.entity';
import { AuthService } from 'src/modules/auth/auth.service';
import { Repository } from 'typeorm';
import { MailService } from '../mail/mail.service';
import { v4 as uuidv4 } from 'uuid';
import { StripeService } from '../stripe/stripe.service';
@Injectable()
export class FacebookService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly mailService:MailService,
        private readonly authService: AuthService,
        private readonly stripeService:StripeService
    ){}
    async resquestUser(req){
        const user = req.user.profile;
        const findUserByEmail = await this.userRepository.findOne({
            where:{email: user._json.email}
        });
        if(findUserByEmail)
            return await this.authService.generateJWT_User(findUserByEmail);
        const stripeCustomerId = await this.stripeService.createCustomer(`${user._json.last_name} ${user._json.first_name}`,user._json.email);
        const createUser = {
            id:uuidv4(),
            user_name: `${user._json.last_name} ${user._json.first_name}`,
            email:user._json.email,
            roleId:5,
            login:Login.FACEBOOK,
            avatar:user.photos[0].value,
            stripeCustomerId:stripeCustomerId.id
        }
        const response = await this.userRepository.save(createUser);
        await this.mailService.sendUserConfirmation(response.user_name, response.email);
        return await this.authService.generateJWT_User(response);
    }
}