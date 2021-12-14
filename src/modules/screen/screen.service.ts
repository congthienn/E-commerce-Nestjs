import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DesignScreen,} from 'src/models/designScreen.entity';
import { Repository } from 'typeorm';
import { CreateScreenDto } from './dto/create-screen.dto';

@Injectable()
export class ScreenService {
    constructor(
        @InjectRepository(DesignScreen)
        private readonly screenRepository:Repository<DesignScreen>
    ){}
    async findAll():Promise<DesignScreen[]>{
        return await this.screenRepository.find();
    }
    async create(screen:CreateScreenDto):Promise<DesignScreen>{
        return await this.screenRepository.save(screen)
    }
    async delete(id:number):Promise<any>{
        return await this.screenRepository.delete(id);
    }
}
