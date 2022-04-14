import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { UserMessageService } from '../user-message/user-message.service';

@Controller('messages')
export class MessageController {
  constructor(
    private readonly messageService: MessageService,
    private readonly userMessageService: UserMessageService,
  ) {}

  // @Post()
  // create(@Body() createMessageDto: CreateMessageDto) {
  //   return this.messageService.create(createMessageDto);
  // }

  @Get()
  findAll() {
    return this.userMessageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userMessageService.findOne(id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateMessageDto: UpdateMessageDto) {
  //   return this.messageService.update(+id, updateMessageDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.messageService.remove(+id);
  // }
}
