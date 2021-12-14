import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { District } from 'src/models/district.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DistrictService {
    constructor(
        @InjectRepository(District)
        private readonly districtRepository:Repository<District>
    ){}
    async findAll(provinceId:number):Promise<District[]>{
        return await this.districtRepository.find({
            order:{id:"ASC"},
            select:['id','name'],
            where:[
                {provinceId:provinceId}
            ]
        });
    }
}
