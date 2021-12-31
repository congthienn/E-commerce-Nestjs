import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { DesignScreen} from 'src/models/designScreen.entity';
import { hasPermission } from '../auth/decorator/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { CreateScreenDto } from './dto/create-screen.dto';
import { ScreenService } from './screen.service';

@Controller('screen')
export class ScreenController {
    constructor(
        private readonly screenService:ScreenService
    ){}

    @hasPermission("GET_SCREEN")
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Get()
    findAll():Promise<DesignScreen[]>{
        return this.screenService.findAll();
    }

    @hasPermission("POST_SCREEN")
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Post()
    create(@Body() screen:CreateScreenDto):Promise<DesignScreen>{
        return this.screenService.create(screen);
    }

    @hasPermission("PUT_SCREEN")
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Put(":id")
    update(@Param('id') id,@Body() screen:CreateScreenDto):Promise<DesignScreen>{
        return this.screenService.update(id,screen);
    }

    @hasPermission("DELETE_SCREEN")
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Delete(":id")
    delete(@Param('id') id):Promise<any>{
        return this.screenService.delete(id);
    }
}
