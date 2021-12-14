import { Controller, Get } from '@nestjs/common';
import { Province } from 'src/models/province.entity';
import { ProvinceService } from './province.service';

@Controller('province')
export class ProvinceController {
    constructor(
        private readonly provinceService:ProvinceService
    ){}
    @Get()
    findAll():Promise<Province[]>{
        return this.provinceService.findAll();
    }
}
