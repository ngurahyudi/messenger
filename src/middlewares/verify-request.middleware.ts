import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';

@Injectable()
export class VerifyRequestMiddleware implements NestMiddleware {
  constructor(private configService: ConfigService) {}

  private APP_SECRET: string =
    this.configService.get<string>('app.appSecret') || 'SECRET_STRING';

  use(req: Request, res: Response, next: NextFunction) {
    const signature = req.header('x-hub-signature');
    const body = req.body;

    if (!signature) {
      throw new UnauthorizedException('request not authorized');
    } else {
      const elements = signature.split('=');

      var signatureHash = elements[1];

      var expectedHash = crypto
        .createHmac('sha1', this.APP_SECRET)
        .update(JSON.stringify(body))
        .digest('hex');

      if (signatureHash != expectedHash) {
        throw new UnauthorizedException(
          "Couldn't validate the request signature.",
        );
      }

      return next();
    }
  }
}
