import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { lastValueFrom, map } from 'rxjs';
import { Message } from '../message/entities/message.entity';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { UserMessage } from '../user-message/entities/user-message.entity';
import { CreateUserMessageDto } from '../user-message/dto/create-user-message.dto';
import { ApiResponseType } from './types/api-response.types';

@Injectable()
export class SendApiService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(UserMessage)
    private readonly userMessageRepository: Repository<UserMessage>,
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  private ACCESS_TOKEN: string =
    this.configService.get<string>('app.pageAccessToken') || 'SECRET_STRING';

  private REQUEST_URI: string =
    this.configService.get<string>('app.requestUri') ||
    'https://graph.facebook.com/v13.0/me/messages?access_token=';

  private REQUEST_CONFIG: any = {
    headers: { 'Content-Type': 'application/json' },
  };

  private YES_ANSWER: string[] = ['y', 'yes', 'yeah', 'yup'];

  private NO_ANSWER: string[] = ['no', 'nah', 'not', 'nope', 'n'];

  /**
   * It gets the user's data from the database, gets the question messages from the database, loops
   * through the question messages, finds the unresponded message, saves the user's name into the
   * database, updates the user's response into the database, sends the next question message, and
   * sends the response message
   * @param {string} sender_psid - The user's ID
   * @param {any} received_message - This is the message object that was sent to your webhook.
   * @returns The response from the Facebook API.
   */
  async handleMessage(
    sender_psid: string,
    received_message: any,
  ): Promise<ApiResponseType> {
    if (received_message.text) {
      //Get user data
      const user = await this.userRepository.findOne({
        where: { user: sender_psid },
      });

      if (!user) return;

      // Get question messages
      const questionMessages = await this.getMessagesByType('2');

      if (!questionMessages) return;

      for (let i = 0; i < questionMessages.length; i++) {
        const unRespondedMessage = questionMessages[i].userMessages.find(
          (m) => m.userId === user.id && !m.response,
        );

        if (unRespondedMessage) {
          if (questionMessages[i].code === 'NAME2') {
            // save user's name into user table
            await this.userRepository.update(
              { user: sender_psid },
              { name: received_message.text.trim() },
            );
          }

          await this.userMessageRepository.update(
            { id: unRespondedMessage.id },
            {
              responseId: received_message.mid,
              response: received_message.text.trim(),
              jsonResponse: received_message,
            },
          );

          // End of question messages
          if (i + 1 === questionMessages.length) {
            if (
              this.YES_ANSWER.indexOf(
                String(received_message.text.trim()).toLocaleLowerCase(),
              ) > -1
            ) {
              const message = questionMessages.find((m) => m.code === 'DOB');
              if (!message) return;

              const userMessage = message.userMessages.find(
                (m) => m.userId === user.id && m.response,
              );
              if (!userMessage) return;

              const totalDays = this.countDaysOfNextBirthday(
                userMessage.response,
              ).toString();

              await this.send(
                'RESPONSE',
                sender_psid,
                `There are ${totalDays} days left until your next birthday!`,
              );
            } else if (
              this.NO_ANSWER.indexOf(
                String(received_message.text.trim()).toLocaleLowerCase(),
              ) > -1
            ) {
              await this.send('RESPONSE', sender_psid, 'Goodbye 👋');
            }

            break;
          }

          return await this.send(
            'RESPONSE',
            sender_psid,
            questionMessages[i + 1].message,
            questionMessages[i + 1].jsonOptions,
          );
        }
      }
    }
  }

  /**
   * It handles the postback event.
   * @param {string} sender_psid - The user ID of the person who sent the message.
   * @param {any} received_postback - This is the full response object sent back from the Messenger
   * Platform.
   * @returns the userId of the user.
   */
  async handlePostback(
    sender_psid: string,
    received_postback: any,
  ): Promise<ApiResponseType> {
    // Get the payload for the postback
    let payload = received_postback.payload;

    // Set the response based on the postback payload
    if (payload !== 'Welcome to test page!') return;

    // Check for existing user
    const user = await this.userRepository.findOne({
      where: { user: sender_psid },
    });

    let userId: string;
    if (!user) {
      // New user
      const userDto: CreateUserDto = {
        user: sender_psid,
      };

      // Create user data into database
      const userData = this.userRepository.create(userDto);
      const newUser = await this.userRepository.save(userData);
      userId = newUser.id;

      await this.createQuestionMessages(userId);

      await this.sendWelcomeMessages(sender_psid);
    } else {
      // Existing user
      // Delete old user messages
      userId = user.id;

      await this.userMessageRepository.delete({ userId });

      await this.createQuestionMessages(userId);

      await this.sendWelcomeMessages(sender_psid);
    }
  }

  /**
   * It takes in a type, sender_psid, message, and options, and returns a response
   * @param {string} type - The type of message you're sending.
   * @param {string} sender_psid - The user's ID, which is a unique identifier for the user.
   * @param {string} message - The message you want to send to the user.
   * @param {any} [options] - This is an object that contains the following keys:
   * @returns The response from the Facebook API.
   */
  async send(
    type: string,
    sender_psid: string,
    message: string,
    options?: any,
  ): Promise<ApiResponseType> {
    const data = {
      messaging_type: type,
      recipient: {
        id: sender_psid,
      },
      message: {
        text: message,
      },
    };

    if (options) {
      for (let i = 0; i < Object.keys(options).length; i++) {
        const objKey = Object.keys(options)[i];
        const objVal = Object.values(options)[i];
        data.message[objKey] = objVal;
      }
    }

    const observable = this.httpService
      .post(this.REQUEST_URI + this.ACCESS_TOKEN, data, this.REQUEST_CONFIG)
      .pipe(map((response) => response.data));

    const response = await lastValueFrom(observable);
    return response;
  }

  //#region Functions

  /**
   * It takes a date of birth in the format of YYYY-MM-DD and returns the number of days until the next
   * birthday
   * @param {string} dateOfBirth - string - The date of birth of the person.
   * @returns The number of days until the next birthday.
   */
  countDaysOfNextBirthday(dateOfBirth: string): number {
    const dob = dateOfBirth;
    const dobSplit = dob.split('-');

    const today = new Date();
    const thisMonth = today.getMonth() + 1;
    const thisYear = today.getFullYear();
    const nextYear = thisYear + 1;

    let nextBirthDay: Date;
    if (thisMonth >= +dobSplit[1]) {
      if (today.getDate() >= +dobSplit[2]) {
        nextBirthDay = new Date(thisYear, +dobSplit[1] - 1, +dobSplit[2]);
      } else {
        nextBirthDay = new Date(nextYear, +dobSplit[1] - 1, +dobSplit[2]);
      }
    } else {
      nextBirthDay = new Date(thisYear, +dobSplit[1] - 1, +dobSplit[2]);
    }

    const totalMsOfDay = 1000 * 60 * 60 * 24;
    const totalDays = Math.ceil(
      (nextBirthDay.getTime() - today.getTime()) / totalMsOfDay,
    );

    return totalDays;
  }

  /**
   * It returns a list of messages that have a type that matches the messageType parameter
   * @param {string} messageType - string - The type of message you want to retrieve.
   * @returns An array of messages with the specified type.
   */
  async getMessagesByType(messageType: string): Promise<any> {
    return await this.messageRepository.find({
      where: { type: messageType },
      order: { sortOrder: 'ASC' },
    });
  }

  /**
   * It finds all the welcome messages in the database, and then sends them to the user one by one with
   * a 1 second delay between each message
   * @param {string} sender_psid - The user's PSID
   * @returns The return type is void.
   */
  async sendWelcomeMessages(sender_psid: string): Promise<void> {
    const welcomeMessages = await this.getMessagesByType('1');

    if (!welcomeMessages) return;
    welcomeMessages.forEach((m) => {
      setTimeout(() => {
        this.send('RESPONSE', sender_psid, m.message);
      }, 1000);
    });
  }

  /**
   * It creates question messages for user
   * @param {string} userId - The userId of the user who is being created.
   * @returns A promise that resolves to void
   */
  async createQuestionMessages(userId: string): Promise<void> {
    // Get question messages
    const questionMessages = await this.getMessagesByType('2');

    // Check wether question messages are available or not
    if (!questionMessages) return;
    const userMessagesDto: CreateUserMessageDto[] = questionMessages.map(
      (msg: Message) => {
        return {
          userId: userId,
          messageId: msg.id,
        };
      },
    );

    // Create question messages for new user
    const userMessageData = this.userMessageRepository.create(userMessagesDto);
    await this.userMessageRepository.save(userMessageData);
  }

  //#endregion
}
