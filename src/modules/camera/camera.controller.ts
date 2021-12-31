import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { Camera } from 'src/models/camera.entity';
import { hasPermission } from '../auth/decorator/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { CameraService } from './camera.service';
import { CreateCameraDto } from './dto/create-camera.dto';

@Controller('camera')
export class CameraController {
    constructor(
        private readonly cameraService:CameraService
    ){}
    @hasPermission("GET_CAMERA")
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Get()
    findAll():Promise<Camera[]>{
        return this.cameraService.findAll();
    }

    @hasPermission("POST_CAMERA")
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Post()
    create(@Body() camera:CreateCameraDto):Promise<Camera>{
        return this.cameraService.create(camera);
    }

    @hasPermission("PUT_CAMERA")
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Put(":id")
    update(@Param("id") id,@Body() camera:CreateCameraDto):Promise<Camera>{
        return this.cameraService.update(id,camera);
    }

    @hasPermission("DELETE_CAMERA")
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Delete(":id")
    delete(@Param("id") id):Promise<any>{
        return this.cameraService.delete(id);
    }
}