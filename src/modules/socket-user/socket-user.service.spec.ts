import { Test, TestingModule } from '@nestjs/testing';
import { SocketUserService } from './socket-user.service';

describe('SocketUserService', () => {
  let service: SocketUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SocketUserService],
    }).compile();

    service = module.get<SocketUserService>(SocketUserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
