import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Province } from 'src/models/province.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProvinceService {
    constructor(
        @InjectRepository(Province)
        private readonly provinceRepository: Repository<Province>
    ){}
    async findAll():Promise<Province[]>{
        return await this.provinceRepository.find({
            order:{id:"ASC"},
            select:['id','name']
        });
    }
}
