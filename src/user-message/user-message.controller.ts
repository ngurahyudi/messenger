import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserMessageService } from './user-message.service';
import { CreateUserMessageDto } from './dto/create-user-message.dto';
import { UpdateUserMessageDto } from './dto/update-user-message.dto';

@Controller('user-message')
export class UserMessageController {
  constructor(private readonly userMessageService: UserMessageService) {}

  // @Post()
  // create(@Body() createUserMessageDto: CreateUserMessageDto) {
  //   return this.userMessageService.create(createUserMessageDto);
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
  // update(
  //   @Param('id') id: string,
  //   @Body() updateUserMessageDto: UpdateUserMessageDto,
  // ) {
  //   return this.userMessageService.update(+id, updateUserMessageDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userMessageService.remove(+id);
  // }
}
