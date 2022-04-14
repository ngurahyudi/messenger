import { Test, TestingModule } from '@nestjs/testing';
import { UserMessageController } from './user-message.controller';
import { UserMessageService } from './user-message.service';

describe('UserMessageController', () => {
  let controller: UserMessageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserMessageController],
      providers: [UserMessageService],
    }).compile();

    controller = module.get<UserMessageController>(UserMessageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
