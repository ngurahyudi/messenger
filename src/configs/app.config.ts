import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  pageId: process.env.PAGE_ID,
  pageAccessToken: process.env.PAGE_ACCESS_TOKEN,
  verifyToken: process.env.VERIFY_TOKEN,
  appSecret: process.env.APP_SECRET,
  requestUri: process.env.REQUEST_URI,
  port: process.env.PORT,
  nodeEnv: process.env.NODE_ENV,
}));
