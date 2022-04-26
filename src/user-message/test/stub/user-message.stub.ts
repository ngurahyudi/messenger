import { UserMessageType } from 'src/user-message/types/user-message.type';

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
