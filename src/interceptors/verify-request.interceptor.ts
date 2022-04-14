import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import * as crypto from 'crypto';
import { ConfigService } from '@nestjs/config';
import { Observable } from 'rxjs';

@Injectable()
export class VerifyRequestInterceptor implements NestInterceptor {
  constructor(private configService: ConfigService) {}

  private APP_SECRET: string =
    this.configService.get<string>('app.appSecret') || 'SECRET_STRING';

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const httpContext = context.switchToHttp();
    const req: Request = httpContext.getRequest();
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

      return next.handle();
    }
  }
}
