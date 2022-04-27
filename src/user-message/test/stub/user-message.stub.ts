import { UserMessageType } from '../../types/user-message.type';

export const userMessageStub = (): UserMessageType => {
  return {
    messageId: 'test',
    jsonResponse: {
      mid: 'test',
      text: 'test',
    },
    __entity: 'UserMessage',
  };
};
