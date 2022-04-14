import { registerAs } from '@nestjs/config';

export default registerAs('db', () => ({
  type: process.env.DATABASE_TYPE,
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  rootPassword: process.env.DATABASE_ROOT_PASSWORD,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: process.env.DATABASE_SYNCHRONIZE,
}));
