import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SpecialFeature } from 'src/models/special_feature.entity';
import { Repository } from 'typeorm';
import { CreateSpecialFeatureDto } from './dto/create-special-feature.dto';

@Injectable()
export class SpecialFeatureService {
    constructor(
        @InjectRepository(SpecialFeature)
        private readonly specialFeatureRepository: Repository<SpecialFeature>
    ){}
    async finAll():Promise<SpecialFeature[]>{
        return await this.specialFeatureRepository.find();
    }
    async create(specialfeature: CreateSpecialFeatureDto):Promise<SpecialFeature>{
        return await this.specialFeatureRepository.save(specialfeature);
    }
    async delete(id:number):Promise<any>{
        return await this.specialFeatureRepository.delete(id);
    }
}
