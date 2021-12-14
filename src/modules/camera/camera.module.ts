import { Module } from '@nestjs/common';
import { CameraService } from './camera.service';
import { CameraController } from './camera.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Camera } from 'src/models/camera.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Camera])],
  providers: [CameraService],
  controllers: [CameraController]
})
export class CameraModule {}
