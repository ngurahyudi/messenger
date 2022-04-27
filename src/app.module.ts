import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SendApiModule } from './send-api/send-api.module';
import { UserMessageModule } from './user-message/user-message.module';

import appConfig from './configs/app.config';
import databaseConfig from './configs/database.config';
import { TypeOrmConfigService } from './database/typeorm-config.service';
import { User } from './user/entities/user.entity';
import { VerifyRequestMiddleware } from './middlewares/verify-request.middleware';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, databaseConfig],
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    SendApiModule,
    UserMessageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
// export class AppModule {}
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(VerifyRequestMiddleware).forRoutes('webhook');
  }
}
