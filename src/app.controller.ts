import { Body, Controller, Get, HttpCode, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('webhook')
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }

  @Get()
  getWebhook(
    @Query('hub.mode') mode: string,
    @Query('hub.verify_token') token: string,
    @Query('hub.challenge') challenge: string,
  ) {
    return this.appService.getWebhook(mode, token, challenge);
  }

  @Post()
  @HttpCode(200)
  postWebhook(@Body() props: any): any {
    return this.appService.postWebhook(props);
  }
}
