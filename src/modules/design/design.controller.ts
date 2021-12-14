import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Design } from 'src/models/design.entity';
import { DesignService } from './design.service';
import { CreateDesignDto } from './dto/create-design.dto';

@Controller('design')
export class DesignController {
    constructor(
        private readonly designService:DesignService
    ){}
    @Get()
    findAll():Promise<Design[]>{
        return this.designService.findAll();
    }
    @Post()
    create(@Body() design:CreateDesignDto):Promise<Design>{
        return this.designService.create(design);
    }
    @Delete(":id")
    delete(@Param('id') id):Promise<any>{
        return this.designService.delete(id);
    }
}
