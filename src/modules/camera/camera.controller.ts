import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Camera } from 'src/models/camera.entity';
import { CameraService } from './camera.service';
import { CreateCameraDto } from './dto/create-camera.dto';

@Controller('camera')
export class CameraController {
    constructor(
        private readonly cameraService:CameraService
    ){}
    @Get()
    findAll():Promise<Camera[]>{
        return this.cameraService.findAll();
    }
    @Post()
    create(@Body() camera:CreateCameraDto):Promise<Camera>{
        return this.cameraService.create(camera);
    }
    @Delete(":id")
    delete(@Param("id") id):Promise<any>{
        return this.cameraService.delete(id);
    }
}
