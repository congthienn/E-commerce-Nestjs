import { Test, TestingModule } from '@nestjs/testing';
import { SpecialFeatureService } from './special-feature.service';

describe('SpecialFeatureService', () => {
  let service: SpecialFeatureService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SpecialFeatureService],
    }).compile();

    service = module.get<SpecialFeatureService>(SpecialFeatureService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
