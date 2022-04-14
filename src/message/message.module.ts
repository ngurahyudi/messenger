import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { UserMessageModule } from '../user-message/user-message.module';
import { UserMessageService } from 'src/user-message/user-message.service';

@Module({
  imports: [TypeOrmModule.forFeature([Message]), UserMessageModule],
  controllers: [MessageController],
  providers: [MessageService],
  exports: [MessageService],
})
export class MessagesModule {}
