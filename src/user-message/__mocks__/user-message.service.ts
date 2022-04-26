import { userMessageStub } from '../test/stub/user-message.stub';

export const UserMessageService = jest.fn().mockReturnValue({
  findAll: jest.fn().mockResolvedValue([userMessageStub()]),
  findOne: jest.fn().mockResolvedValue(userMessageStub()),
});
