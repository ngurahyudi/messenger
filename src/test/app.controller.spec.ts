import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from '../app.controller';
import { AppService } from '../app.service';
import { payloadStub } from './stub/payload.stub';
import { verifyStub } from './stub/verify.stub';

jest.mock('../app.service.ts');

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);

    jest.clearAllMocks();
  });

  describe('App Controller', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });

  describe('getWebhook', () => {
    describe('when getWebhook gets called', () => {
      let verifyResponse: string;
      let verifyPayload = verifyStub();

      beforeEach(async () => {
        verifyResponse = appService.getWebhook(
          verifyPayload.mode,
          verifyPayload.token,
          verifyPayload.challenge,
        );
      });

      test('then it should call AppService', () => {
        expect(appService.getWebhook).toHaveBeenCalled();
      });

      test('then it should return UserMessageTypes', () => {
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

      test('then it should call AppService', () => {
        expect(appService.postWebhook).toHaveBeenCalled();
      });

      test("then it should return 'EVENT RECEIVED'", () => {
        expect(responseString).toEqual('EVENT RECEIVED');
      });
    });
  });
});
