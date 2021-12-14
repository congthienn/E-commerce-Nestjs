import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { DesignScreen} from 'src/models/designScreen.entity';
import { CreateScreenDto } from './dto/create-screen.dto';
import { ScreenService } from './screen.service';

@Controller('screen')
export class ScreenController {
    constructor(
        private readonly screenService:ScreenService
    ){}

    @Get()
    findAll():Promise<DesignScreen[]>{
        return this.screenService.findAll();
    }
    @Post()
    create(@Body() screen:CreateScreenDto):Promise<DesignScreen>{
        return this.screenService.create(screen);
    }
    @Delete(":id")
    delete(@Param('id') id):Promise<any>{
        return this.screenService.delete(id);
    }
}
