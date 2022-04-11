import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('app.port') || 3000;
  console.log(port);

  await app.listen(port, () => {
    console.log(`service is listening on port: ${port}`);
  });
}
bootstrap();
