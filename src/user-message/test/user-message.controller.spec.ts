import { Test, TestingModule } from '@nestjs/testing';
import { UserMessageType } from '../types/user-message.type';
import { UserMessageController } from '../user-message.controller';
import { UserMessageService } from '../user-message.service';
import { userMessageStub } from './stub/user-message.stub';

jest.mock('../user-message.service.ts');

describe('UserMessageController', () => {
  let userMessageController: UserMessageController;
  let userMessageService: UserMessageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserMessageController],
      providers: [UserMessageService],
    }).compile();

    userMessageController = module.get<UserMessageController>(
      UserMessageController,
    );

    userMessageService = module.get<UserMessageService>(UserMessageService);

    jest.clearAllMocks();
  });

  describe('findAll', () => {
    describe('when findAll gets called', () => {
      let userMessages: UserMessageType[];

      beforeEach(async () => {
        userMessages = await userMessageController.findAll();
      });

      test('then it should call UserMessageService', () => {
        expect(userMessageService.findAll).toHaveBeenCalled();
      });

      test('then it should return UserMessageTypes', () => {
        expect(userMessages).toEqual([userMessageStub()]);
      });
    });
  });

  describe('findOne', () => {
    describe('when findOne gets called', () => {
      let userMessages: UserMessageType;

      beforeEach(async () => {
        userMessages = await userMessageController.findOne(
          userMessageStub().messageId,
        );
      });

      test('then it should call UserMessageService', () => {
        expect(userMessageService.findOne).toHaveBeenCalledWith(
          userMessageStub().messageId,
        );
      });

      test('then it should return a UserMessageType', () => {
        expect(userMessages).toEqual(userMessageStub());
      });
    });
  });
});
