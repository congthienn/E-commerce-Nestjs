import { Module } from '@nestjs/common';
import { ScreenService } from './screen.service';
import { ScreenController } from './screen.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DesignScreen } from 'src/models/designScreen.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DesignScreen])],
  providers: [ScreenService],
  controllers: [ScreenController]
})
export class ScreenModule {}
