import { Test, TestingModule } from '@nestjs/testing';

import { AppService } from '../app.service';
import { payloadStub } from './stub/payload.stub';
import { verifyStub } from './stub/verify.stub';

jest.mock('../app.service.ts');

describe('AppService', () => {
  let appService: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppService],
    }).compile();

    appService = module.get<AppService>(AppService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(appService).toBeDefined();
  });

  describe('getWebhook', () => {
    describe('when getWebhook gets called', () => {
      let verifyResponse: string;
      let verifyPayload = verifyStub();

      beforeEach(() => {
        verifyResponse = appService.getWebhook(
          verifyPayload.mode,
          verifyPayload.token,
          verifyPayload.challenge,
        );
      });

      test('then it should return challenge code', () => {
        expect(verifyResponse).toEqual(verifyPayload.challenge);
      });
    });
  });

  describe('postWebhook', () => {
    describe('when postWebhook gets called', () => {
      let responseString: string;

      beforeEach(() => {
        responseString = appService.postWebhook(payloadStub());
      });

      test("then it should return 'EVENT RECEIVED'", () => {
        expect(responseString).toEqual('EVENT RECEIVED');
      });
    });
  });
});
