import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Design } from 'src/models/design.entity';
import { Repository } from 'typeorm';
import { CreateDesignDto } from './dto/create-design.dto';

@Injectable()
export class DesignService {
    constructor(
        @InjectRepository(Design)
        private readonly designRepository:Repository<Design>
    ){}
    async findAll():Promise<Design[]>{
        return await this.designRepository.find();
    }
    async create(design:CreateDesignDto):Promise<Design>{
        return await this.designRepository.save(design);
    }
    async update(id:number,designUpdate:CreateDesignDto):Promise<Design>{
        const design = await this.designRepository.findOne({id});
        if(!design)
            throw new NotFoundException({
                code: 404,
                message: "Design not found"
            });
        design.name = designUpdate.name;
        return await this.designRepository.save(design);
    }
    async delete(id:number):Promise<any>{
        return await this.designRepository.delete(id);
    }
}
