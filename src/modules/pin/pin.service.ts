import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pin } from 'src/models/pin.entity';
import { Repository } from 'typeorm';
import { CreatePinDto } from './dto/create-pin.dto';

@Injectable()
export class PinService {
    constructor(
        @InjectRepository(Pin)
        private readonly pinRepository:Repository<Pin>
    ){}
    async findAll():Promise<Pin[]> {
        return await this.pinRepository.find();
    }
    async create(pin:CreatePinDto):Promise<Pin> {
        return await this.pinRepository.save(pin);
    }
    async delete(id:number):Promise<any>{
        return await this.pinRepository.delete(id);
    }
}
