import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { VerifyRequestInterceptor } from './interceptors/verify-request.interceptor';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/policy')
  policy() {
    return 'ok';
  }

  @Get('/webhook')
  getWebhook(
    @Query('hub.mode') mode: string,
    @Query('hub.verify_token') token: string,
    @Query('hub.challenge') challenge: string,
  ) {
    return this.appService.getWebhook(mode, token, challenge);
  }

  @Post('/webhook')
  @HttpCode(200)
  postWebhook(@Body() props: any): any {
    return this.appService.postWebhook(props);
  }

  @Get('/summary')
  summary() {
    return this.appService.summary();
  }
}
