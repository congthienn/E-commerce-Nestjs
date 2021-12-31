import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { Permissions } from 'src/models/permissions.entity';
import { CreatePermissionDto } from './dto/create-permissions.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { hasPermission } from '../auth/decorator/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
@Controller('permissions')
export class PermissionsController {
    constructor(
        private readonly permissionsService: PermissionsService
    ){}

    @hasPermission("GET_PERMISSION")
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Get()
    findAll():Promise<Permissions[]>{
        return this.permissionsService.findAll();
    }

    @hasPermission("GET_PERMISSION")
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Get(':name')
    findOne(@Param('name') name):Promise<Permissions[]>{
        return this.permissionsService.findOne(name);
    }

    @hasPermission("POST_PERMISSION")
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Post()
    create(@Body() permissions:CreatePermissionDto):Promise<Permissions>{
        return this.permissionsService.create(permissions);
    }

    @hasPermission("DELETE_PERMISSION")
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Delete(':id')
    delete(@Param('id') id):Promise<any>{
        return this.permissionsService.delete(id);
    }
    
    @hasPermission("PUT_PERMISSION")
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Put(":id")
    update(@Param('id') id,@Body() permission:UpdatePermissionDto):Promise<Permissions>{
        return this.permissionsService.update(permission,id);
    }
}