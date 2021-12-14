import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Pin } from 'src/models/pin.entity';
import { CreatePinDto } from './dto/create-pin.dto';
import { PinService } from './pin.service';

@Controller('pin')
export class PinController {
    constructor(
        private readonly pinService:PinService
    ){}
    @Get()
    findAll():Promise<Pin[]>{
        return this.pinService.findAll();
    }
    @Post()
    create(@Body() pin:CreatePinDto):Promise<Pin>{
        return this.pinService.create(pin);
    }
    @Delete(":id")
    delete(@Param('id') id):Promise<any>{
        return this.pinService.delete(id);
    }
}
