import { Test, TestingModule } from '@nestjs/testing';
import { SendApiService } from './send-api.service';

describe('SendApiService', () => {
  let service: SendApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SendApiService],
    }).compile();

    service = module.get<SendApiService>(SendApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
