import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { Pin } from 'src/models/pin.entity';
import { hasPermission } from '../auth/decorator/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { CreatePinDto } from './dto/create-pin.dto';
import { PinService } from './pin.service';

@Controller('pin')
export class PinController {
    constructor(
        private readonly pinService:PinService
    ){}
    @hasPermission("GET_PIN")
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Get()
    findAll():Promise<Pin[]>{
        return this.pinService.findAll();
    }

    @hasPermission("POST_PIN")
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Post()
    create(@Body() pin:CreatePinDto):Promise<Pin>{
        return this.pinService.create(pin);
    }

    @hasPermission("PUT_PIN")
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Put(":id")
    update(@Param('id') id,@Body() pin:CreatePinDto):Promise<Pin>{
        return this.pinService.update(id,pin);
    }

    @hasPermission("DELETE_PIN")
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Delete(":id")
    delete(@Param('id') id):Promise<any>{
        return this.pinService.delete(id);
    }
}
