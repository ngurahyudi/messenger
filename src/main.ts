import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import * as express from 'express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use('/', express.static(join(__dirname, 'assets')));

  const configService = app.get(ConfigService);
  const port = configService.get<number>('app.port') || 3000;

  await app.listen(port, () => {
    console.log(`service is listening on port: ${port}`);
  });
}
bootstrap();
