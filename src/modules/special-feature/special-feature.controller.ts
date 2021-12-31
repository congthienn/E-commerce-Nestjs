import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { SpecialFeature } from 'src/models/special_feature.entity';
import { hasPermission } from '../auth/decorator/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { CreateSpecialFeatureDto } from './dto/create-special-feature.dto';
import { SpecialFeatureService } from './special-feature.service';

@Controller('special-feature')
export class SpecialFeatureController {
    constructor(
        private readonly specialfeatureService: SpecialFeatureService
    ){}

    @hasPermission('GET_FEATURE')
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Get()
    findAll():Promise<SpecialFeature[]>{
        return this.specialfeatureService.finAll();
    }

    @hasPermission('POST_FEATURE')
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Post()
    create(@Body() specialfeature:CreateSpecialFeatureDto):Promise<SpecialFeature>{
        return this.specialfeatureService.create(specialfeature);
    }

    @hasPermission('PUT_FEATURE')
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Put(":id")
    update(@Param("id") id,@Body() specialfeature:CreateSpecialFeatureDto):Promise<SpecialFeature>{
        return this.specialfeatureService.update(id,specialfeature);
    }

    @hasPermission('DELETE_FEATURE')
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Delete(":id")
    delete(@Param('id') id):Promise<any>{
        return this.specialfeatureService.delete(id);
    }
}
