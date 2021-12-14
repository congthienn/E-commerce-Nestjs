import { Module } from '@nestjs/common';
import { DesignService } from './design.service';
import { DesignController } from './design.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Design } from 'src/models/design.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Design])],
  providers: [DesignService],
  controllers: [DesignController]
})
export class DesignModule {}
