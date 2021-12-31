import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { RolePermission } from 'src/models/role_permission.entity';
import { hasPermission } from '../auth/decorator/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { CreateRolePermissionDto } from './dto/create-role-permission.dto';
import { RolePermissionService } from './role-permission.service';

@Controller('authorization')
export class RolePermissionController {
    constructor(
        private readonly rolePermissionService: RolePermissionService
    ){}
    
    @hasPermission("GET_AUTH")
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Get()
    findAll():Promise<RolePermission[]>{
        return this.rolePermissionService.findAll();
    }

    @hasPermission("GET_AUTH")
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Get(":id")
    findOne(@Param("id") id):Promise<any>{
        return this.rolePermissionService.findOne(id);
    }

    @hasPermission("POST_AUTH")
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Post()
    create(@Body() rolePermissionDto:CreateRolePermissionDto):Promise<any>{
        return this.rolePermissionService.create(rolePermissionDto);
    }

    @hasPermission("PUT_AUTH")
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Put()
    update(@Body() rolePermissionDto:CreateRolePermissionDto):Promise<any>{
        return this.rolePermissionService.update(rolePermissionDto);
    }
}
