import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as sinon from 'sinon';
import { Repository } from 'typeorm';

import { UserMessage } from '../entities/user-message.entity';
import { userMessageStub } from './stub/user-message.stub';
import { UserMessageType } from '../types/user-message.type';
import { UserMessageService } from '../user-message.service';

jest.mock('../user-message.service.ts');

describe('UserMessageService', () => {
  let userMessageService: UserMessageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserMessageService,
        {
          provide: getRepositoryToken(UserMessage),
          useValue: sinon.createStubInstance(Repository),
        },
      ],
    }).compile();

    userMessageService = module.get<UserMessageService>(UserMessageService);

    jest.clearAllMocks();
  });

  describe('findAll', () => {
    describe('when findAll gets called', () => {
      let userMessages: UserMessageType[];

      beforeEach(async () => {
        userMessages = await userMessageService.findAll();
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
        userMessages = await userMessageService.findOne(
          userMessageStub().messageId,
        );
      });

      test('then it should return a UserMessageType', () => {
        expect(userMessages).toEqual(userMessageStub());
      });
    });
  });
});
