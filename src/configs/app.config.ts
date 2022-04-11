import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  verifyToken: process.env.VERIFY_TOKEN,
}));
