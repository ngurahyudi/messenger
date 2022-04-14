import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserMessageDto } from './dto/create-user-message.dto';
import { UpdateUserMessageDto } from './dto/update-user-message.dto';
import { UserMessage } from './entities/user-message.entity';

@Injectable()
export class UserMessageService {
  constructor(
    @InjectRepository(UserMessage)
    private readonly userMessageRepository: Repository<UserMessage>,
  ) {}

  create(createUserMessageDto: CreateUserMessageDto) {
    return 'This action adds a new userMessage';
  }

  async findAll() {
    return await this.userMessageRepository.find({ select: ['jsonResponse'] });
  }

  async findOne(id: string) {
    return await this.userMessageRepository.findOne({
      where: { responseId: id },
      select: ['jsonResponse'],
    });
  }

  update(id: number, updateUserMessageDto: UpdateUserMessageDto) {
    return `This action updates a #${id} userMessage`;
  }

  remove(id: number) {
    return `This action removes a #${id} userMessage`;
  }
}
