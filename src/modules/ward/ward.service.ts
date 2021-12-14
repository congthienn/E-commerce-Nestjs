import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ward } from 'src/models/ward.entity';
import { Repository } from 'typeorm';

@Injectable()
export class WardService {
    constructor(
        @InjectRepository(Ward)
        private readonly wardRepository: Repository<Ward>
    ){}
    async findAll(districtId:number):Promise<Ward[]>{
        return await this.wardRepository.find({
            order:{id:"ASC"},
            select:['id','name'],
            where:[ 
                {districtId:districtId}
            ]
        })
    }
}
