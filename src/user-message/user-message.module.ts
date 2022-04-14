import { Module } from '@nestjs/common';
import { UserMessageService } from './user-message.service';
import { UserMessageController } from './user-message.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserMessage } from './entities/user-message.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserMessage])],
  controllers: [UserMessageController],
  providers: [UserMessageService],
  exports: [UserMessageService],
})
export class UserMessageModule {}
