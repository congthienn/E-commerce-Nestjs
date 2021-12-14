import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { SpecialFeature } from 'src/models/special_feature.entity';
import { CreateSpecialFeatureDto } from './dto/create-special-feature.dto';
import { SpecialFeatureService } from './special-feature.service';

@Controller('special-feature')
export class SpecialFeatureController {
    constructor(
        private readonly specialfeatureService: SpecialFeatureService
    ){}
    @Get()
    findAll():Promise<SpecialFeature[]>{
        return this.specialfeatureService.finAll();
    }
    @Post()
    create(@Body() specialfeature:CreateSpecialFeatureDto):Promise<SpecialFeature>{
        return this.specialfeatureService.create(specialfeature);
    }
    @Delete(":id")
    delete(@Param('id') id):Promise<any>{
        return this.specialfeatureService.delete(id);
    }
}
