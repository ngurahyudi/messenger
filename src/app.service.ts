import {
  Body,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}
  // getHello(): string {
  //   return 'Hello World!';
  // }

  getWebhook(mode: string, token: string, challenge: string) {
    // Your verify token. Should be a random string.
    let VERIFY_TOKEN =
      this.configService.get<string>('app.verifyToken') || 'SECRET_STRING';

    // Checks if a token and mode is in the query string of the request
    if (mode && token) {
      // Checks the mode and token sent is correct
      if (mode === 'subscribe' && token === VERIFY_TOKEN) {
        // Responds with the challenge token from the request
        console.log('WEBHOOK_VERIFIED');
        return challenge;
      } else {
        // Responds with '403 Forbidden' if verify tokens do not match
        return new ForbiddenException();
      }
    }
  }

  postWebhook(props: any) {
    // Checks this is an event from a page subscription
    if (props.object === 'page') {
      const { entry } = props;

      entry.forEach((entry: any) => {
        // Gets the message. entry.messaging is an array, but
        // will only ever contain one message, so we get index 0
        let webhook_event = entry.messaging[0];
        console.log(webhook_event);
      });

      return 'EVENT RECEIVED';
    }

    // Returns a '200 OK' response to all requests
    throw new NotFoundException('NOT FOUND');
  }
}
