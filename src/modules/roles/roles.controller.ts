import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { Roles } from 'src/models/roles.entity';
import { hasPermission } from '../auth/decorator/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { CreateRoleDto } from './dto/create_roles.dto';
import { RolesService } from './roles.service';

@Controller('roles')
export class RolesController {
    constructor(
        private readonly rolesService: RolesService
    ){}
    @hasPermission("GET_ROLE")
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Get()
    findAll():Promise<Roles[]>{
        return this.rolesService.findAll();
    }

    @hasPermission("POST_ROLE")
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Post()
    create(@Body() roleDto:CreateRoleDto):Promise<Roles>{
        return this.rolesService.create(roleDto);
    }

    @hasPermission("PUT_ROLE")
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Put(":id")
    update(@Body() roleDto:CreateRoleDto,@Param('id') id):Promise<Roles>{
        return this.rolesService.update(roleDto,id);
    }

    @hasPermission("DELETE_ROLE")
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Delete(":id")
    delete(@Param('id') id):Promise<any>{
        return this.rolesService.delete(id);
    }
}
