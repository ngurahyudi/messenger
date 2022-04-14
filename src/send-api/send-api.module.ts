import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Message } from '../message/entities/message.entity';
import { SendApiService } from './send-api.service';
import { UserMessage } from '../user-message/entities/user-message.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Message, User, UserMessage]), HttpModule],
  providers: [SendApiService],
  exports: [SendApiService],
})
export class SendApiModule {}
