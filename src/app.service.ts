import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SendApiService } from './send-api/send-api.service';
import { ApiResponseType } from './send-api/types/api-response.types';
import { User } from './user/entities/user.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly configService: ConfigService,
    private readonly sendApiService: SendApiService,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  /**
   * If the mode and token are in the query string, and the mode is subscribe and the token matches the
   * one in the environment, then return the challenge. Otherwise, throw a 403 Forbidden error
   * @param {string} mode - The mode sent in the request.
   * @param {string} token - The token that Facebook sends to your webhook to verify that it's really
   * Facebook sending the request.
   * @param {string} challenge - The challenge parameter is a random string that you must echo back to
   * Facebook.
   * @returns The challenge string
   */
  getWebhook(mode: string, token: string, challenge: string) {
    // Your verify token. Should be a random string.
    console.log(mode);
    console.log(token);
    console.log(challenge);

    const VERIFY_TOKEN =
      this.configService.get<string>('app.verifyToken') || 'SECRET_STRING';

    // Checks if a token and mode is in the query string of the request
    if (mode && token) {
      // Checks the mode and token sent is correct
      if (mode === 'subscribe' && token === VERIFY_TOKEN) {
        // Responds with the challenge token from the request
        return challenge;
      } else {
        // Responds with '403 Forbidden' if verify tokens do not match
        throw new ForbiddenException();
      }
    }

    throw new ForbiddenException();
  }

  /**
   * It checks if the event is a message or postback and passes the event to the appropriate handler
   * function
   * @param {any} props - any
   * @returns A string
   */
  postWebhook(props: any): string {
    const PAGE_ID =
      this.configService.get<string>('app.pageId') || '101251929233504';

    // Checks this is an event from a page subscription
    if (props.object === 'page') {
      const { entry } = props;

      entry.forEach(async (entry: any) => {
        // Gets the message. entry.messaging is an array, but
        // will only ever contain one message, so we get index 0
        let webhook_event = entry.messaging[0];
        // console.log(entry);
        console.log(webhook_event);

        // Get the sender PSID
        let sender_psid = webhook_event.sender.id;
        console.log('Sender PSID: ' + sender_psid);

        // Check if the event is a message or postback and
        // pass the event to the appropriate handler function
        if (webhook_event.message && sender_psid !== PAGE_ID) {
          await this.sendApiService.handleMessage(
            sender_psid,
            webhook_event.message,
          );
        } else if (webhook_event.postback) {
          await this.sendApiService.handlePostback(
            sender_psid,
            webhook_event.postback,
          );
        }
      });

      return 'EVENT RECEIVED';
    }

    throw new NotFoundException('NOT FOUND');
  }

  /**
   * It returns a list of users with their messages
   * @returns An array of objects with the following properties:
   *   user: string
   *   name: string
   *   messages: array of objects with the following properties:
   *     id: number
   *     message: string
   *     user: string
   *     createdAt: Date
   *     updatedAt: Date
   */
  async summary() {
    return await this.userRepository
      .createQueryBuilder('user')
      .leftJoin('user.userMessages', 'messages')
      .select(['user.user', 'user.name', 'messages'])
      .getMany();
  }
}
