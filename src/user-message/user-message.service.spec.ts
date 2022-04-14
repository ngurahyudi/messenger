import { Test, TestingModule } from '@nestjs/testing';
import { UserMessageService } from './user-message.service';

describe('UserMessageService', () => {
  let service: UserMessageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserMessageService],
    }).compile();

    service = module.get<UserMessageService>(UserMessageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
