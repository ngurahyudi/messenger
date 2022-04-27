import { verifyStub } from '../test/stub/verify.stub';

export const AppService = jest.fn().mockReturnValue({
  getHello: jest.fn().mockReturnValue('Hello World!'),
  getWebhook: jest.fn().mockReturnValue(verifyStub().challenge),
  postWebhook: jest.fn().mockReturnValue('EVENT RECEIVED'),
});
