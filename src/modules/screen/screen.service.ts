import { Injectable, NotFoundException } from '@nestjs/common';
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
    async update(id:number,screenUpdate:CreateScreenDto):Promise<DesignScreen>{
        const designScreen = await this.screenRepository.findOne(id);
        if(!designScreen)
            throw new NotFoundException({
                code: 404,
                message:"Not found"
            });
        designScreen.name = screenUpdate.name;
        return await this.screenRepository.save(designScreen);
    }
    async delete(id:number):Promise<any>{
        return await this.screenRepository.delete(id);
    }
}
