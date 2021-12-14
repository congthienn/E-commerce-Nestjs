import { Controller, Get, Param } from '@nestjs/common';
import { District } from 'src/models/district.entity';
import { DistrictService } from './district.service';

@Controller('district')
export class DistrictController {
    constructor(
        private readonly districtService: DistrictService
    ){}
    @Get(':provinceId')
    async findAll(@Param('provinceId') provinceId):Promise<District[]>{
         return await this.districtService.findAll(provinceId);
    }
}