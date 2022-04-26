import { Controller, Get, Param } from '@nestjs/common';
import { UserMessage } from './entities/user-message.entity';
import { UserMessageType } from './types/user-message.type';
import { UserMessageService } from './user-message.service';

@Controller('messages')
export class UserMessageController {
  constructor(private readonly userMessageService: UserMessageService) {}

  @Get()
  async findAll(): Promise<UserMessageType[]> {
    return await this.userMessageService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UserMessageType> {
    return await this.userMessageService.findOne(id);
  }
}
