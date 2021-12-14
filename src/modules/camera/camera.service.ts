import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Camera } from 'src/models/camera.entity';
import { Repository } from 'typeorm';
import { CreateCameraDto } from './dto/create-camera.dto';

@Injectable()
export class CameraService {
    constructor(
          @InjectRepository(Camera)
        private readonly cameraRepository:Repository<Camera>
    ){}
    async findAll():Promise<Camera[]>{
        return await this.cameraRepository.find();
    }
    async create(camera:CreateCameraDto):Promise<Camera>{
        return await this.cameraRepository.save(camera);
    }
    async delete(id:number):Promise<any>{
        return await this.cameraRepository.delete(id);
    }
}
