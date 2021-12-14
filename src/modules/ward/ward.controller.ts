import { Controller, Get, Param } from '@nestjs/common';
import { Ward } from 'src/models/ward.entity';
import { WardService } from './ward.service';

@Controller('ward')
export class WardController {
    constructor(
        private readonly wardService:WardService
    ){}
    @Get(':districtId')
    findAll(@Param('districtId') districtId):Promise<Ward[]>{
        return this.wardService.findAll(districtId);
    }
}
