import { Injectable, NotFoundException } from '@nestjs/common';
import { Customer } from 'src/models/customer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { catchError } from 'rxjs';
import { MailService } from 'src/service/mail/mail.service';
import { AuthService } from '../auth/auth.service';
import { LoginCustomerDto } from './dto/login-customer.dto';
@Injectable()
export class CustomerService {
    constructor(
        @InjectRepository(Customer)
        private readonly customerRepository:Repository<Customer>,
        private readonly mailService:MailService,
        private readonly authService:AuthService
    ){}
    
    async finAll():Promise<Customer[]>{
        return await this.customerRepository.find({
            select:['id','name','email','phoneNumber','address']
        });
    }
    async findByEmail(email:string):Promise<Customer> {
        const customer = await this.customerRepository.findOne({
            select:['id','name','email','phoneNumber','address'],
            where:({email:email})
        });
        if(customer) return customer;
        throw new NotFoundException({
            code:404,
            messages:"Customer not found"
        });
    }
    async create(customer:CreateCustomerDto):Promise<any>{
        try {
            const passwordHash = await this.authService.hashPassword(customer.password);
            customer.password = passwordHash;
            const newCustomer = await this.customerRepository.save(customer);
            if(newCustomer){
                const {password,...result} = newCustomer;
                this.mailService.sendCustomerConfirmation(customer)
                return result;
            }
        } catch (error) {
            catchError(error);
        }
    }
    async update(customer:CreateCustomerDto,email:string):Promise<any>{
        const newCustomer = await this.findByEmail(email);
        if(!newCustomer)
            throw new NotFoundException({
                code:404,
                message: 'Customer not found'
            });
        newCustomer.name = customer.name;
        newCustomer.email = customer.email;
        newCustomer.phoneNumber = customer.phoneNumber;
        newCustomer.address = customer.address;
        newCustomer.password = await this.authService.hashPassword(customer.password);
        try {
            const repositoryCustomer = await this.customerRepository.save(newCustomer);
            const {password,...result} = repositoryCustomer;
            return result;
        } catch (error) {
            catchError(error);
        }
    }
    async validateCustomer(email: string,passwordLogin:string):Promise<Customer> {
        const customer = await this.customerRepository.findOne({ email: email});
        if(customer){
            const checkPassword = await this.authService.comparePassword(passwordLogin,customer.password);
            if(checkPassword) return customer;
        }
        return null;
    }
    async login(customer: LoginCustomerDto):Promise<any>{
        const customerLogin = await this.validateCustomer(customer.email, customer.password);
        if(customerLogin){
            return {
                access_token: await this.authService.generateJWT_Customer(customerLogin)
            }
        }
        throw new NotFoundException({
            code:404,
            message:"Login failed"
        })
    }
}