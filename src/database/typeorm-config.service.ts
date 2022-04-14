import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import * as path from 'path';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: this.configService.get('db.type'),
      host: this.configService.get('db.host'),
      port: this.configService.get('db.port'),
      rootPassword: this.configService.get('db.rootPassword'),
      username: this.configService.get('db.username'),
      password: this.configService.get('db.password'),
      database: this.configService.get('db.database'),
      synchronize: this.configService.get('db.synchronize'),
      dropSchema: false,
      keepConnectionAlive: true,
      logging: this.configService.get('app.nodeEnv') !== 'DEVELOPMENT',
      entities: [path.join(__dirname, '../**/entities/*.entity{.ts,.js}')],
      migrations: [path.join(__dirname, '/migrations/**/*{.ts,.js}')],
      seeds: [path.join(__dirname, '/seeds/**/*{.ts,.js}')],
      factories: [path.join(__dirname, '/factories/**/*{.ts,.js}')],
      migrationsTableName: '__migrationhistory',
      cli: {
        // entitiesDir: 'src',
        migrationsDir: 'src/database/migrations',
        subscribersDir: 'subscriber',
      },
      extra: {
        // based on https://node-postgres.com/api/pool
        // max connection pool size
        // max: this.configService.get('database.maxConnections'),
        ssl: this.configService.get('database.sslEnabled')
          ? {
              rejectUnauthorized: this.configService.get(
                'database.rejectUnauthorized',
              ),
              ca: this.configService.get('database.ca')
                ? this.configService.get('database.ca')
                : undefined,
              key: this.configService.get('database.key')
                ? this.configService.get('database.key')
                : undefined,
              cert: this.configService.get('database.cert')
                ? this.configService.get('database.cert')
                : undefined,
            }
          : undefined,
      },
    } as TypeOrmModuleOptions;
  }
}
