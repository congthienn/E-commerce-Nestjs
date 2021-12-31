import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { Design } from 'src/models/design.entity';
import { hasPermission } from '../auth/decorator/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { DesignService } from './design.service';
import { CreateDesignDto } from './dto/create-design.dto';

@Controller('design')
export class DesignController {
    constructor(
        private readonly designService:DesignService
    ){}
    @hasPermission("GET_DESIGN")
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Get()
    findAll():Promise<Design[]>{
        return this.designService.findAll();
    }

    @hasPermission("POST_DESIGN")
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Post()
    create(@Body() design:CreateDesignDto):Promise<Design>{
        return this.designService.create(design);
    }

    @hasPermission("PUT_DESIGN")
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Put(":id")
    update(@Param("id") id,@Body() design:CreateDesignDto):Promise<Design>{
        return this.designService.update(id,design);
    }

    @hasPermission("DELETE_DESIGN")
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Delete(":id")
    delete(@Param('id') id):Promise<any>{
        return this.designService.delete(id);
    }
}
