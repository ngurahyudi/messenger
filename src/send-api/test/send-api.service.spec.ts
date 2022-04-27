import { Test, TestingModule } from '@nestjs/testing';
import { SendApiService } from '../send-api.service';
import { ApiResponseType } from '../types/api-response.types';
import { apiRequestPostbackStub } from './stub/api-request-postback.stub';
import { apiRequestStub } from './stub/api-request.stub';
import { apiResponseStub } from './stub/api-response.stub';

jest.mock('../send-api.service.ts');

describe('SendApiService', () => {
  let sendApiService: SendApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SendApiService],
    }).compile();

    sendApiService = module.get<SendApiService>(SendApiService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(sendApiService).toBeDefined();
  });

  describe('handleMessage', () => {
    describe('when handleMessage gets called', () => {
      let apiResponse: ApiResponseType;
      let apiRequest = apiRequestStub();

      beforeEach(async () => {
        apiResponse = await sendApiService.handleMessage(
          apiRequest.sender_psid,
          apiRequest.received_message,
        );
      });

      test('then it should return an ApiResponseType', () => {
        expect(apiResponse).toEqual(apiResponseStub());
      });
    });
  });

  describe('handlePostback', () => {
    describe('when handlePostback gets called', () => {
      let apiResponse: ApiResponseType;
      let apiRequest = apiRequestPostbackStub();

      beforeEach(async () => {
        apiResponse = await sendApiService.handlePostback(
          apiRequest.sender_psid,
          apiRequest.received_postback,
        );
      });

      test('then it should return an ApiResponseType', () => {
        expect(apiResponse).toEqual(apiResponseStub());
      });
    });
  });

  describe('countDaysOfNextBirthday', () => {
    describe('when countDaysOfNextBirthday gets called', () => {
      let totalDays: number;

      beforeEach(() => {
        totalDays = sendApiService.countDaysOfNextBirthday('1986-07-31');
      });

      test('then it should return a number', () => {
        expect(totalDays).toEqual(95);
      });
    });
  });
});
