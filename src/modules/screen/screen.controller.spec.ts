import { Test, TestingModule } from '@nestjs/testing';
import { ScreenController } from './screen.controller';

describe('ScreenController', () => {
  let controller: ScreenController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ScreenController],
    }).compile();

    controller = module.get<ScreenController>(ScreenController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
