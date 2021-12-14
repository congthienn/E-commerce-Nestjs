import { Test, TestingModule } from '@nestjs/testing';
import { SpecialFeatureController } from './special-feature.controller';

describe('SpecialFeatureController', () => {
  let controller: SpecialFeatureController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SpecialFeatureController],
    }).compile();

    controller = module.get<SpecialFeatureController>(SpecialFeatureController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
