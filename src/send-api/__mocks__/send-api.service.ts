import { apiResponseStub } from '../test/stub/api-response.stub';

export const SendApiService = jest.fn().mockReturnValue({
  handleMessage: jest.fn().mockResolvedValue(apiResponseStub()),
  handlePostback: jest.fn().mockResolvedValue(apiResponseStub()),
  countDaysOfNextBirthday: jest.fn().mockReturnValue(95),
});
