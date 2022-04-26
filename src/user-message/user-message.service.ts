import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserMessage } from './entities/user-message.entity';
import { UserMessageType } from './types/user-message.type';

@Injectable()
export class UserMessageService {
  constructor(
    @InjectRepository(UserMessage)
    private readonly userMessageRepository: Repository<UserMessage>,
  ) {}

  async findAll(): Promise<UserMessageType[]> {
    const messages = await this.userMessageRepository.find({
      select: ['jsonResponse'],
    });
    return messages.map((m: UserMessage) => {
      return {
        messageId: m.responseId,
        jsonResponse: m.jsonResponse,
        __entity: m.__entity,
      };
    });
  }

  async findOne(id: string): Promise<UserMessageType> {
    const message = await this.userMessageRepository.findOne({
      where: { responseId: id },
      select: ['jsonResponse'],
    });

    return {
      messageId: message.responseId,
      jsonResponse: message.jsonResponse,
      __entity: message.__entity,
    };
  }
}
