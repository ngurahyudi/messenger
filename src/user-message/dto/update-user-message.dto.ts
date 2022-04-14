import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString } from 'class-validator';
import { CreateUserMessageDto } from './create-user-message.dto';

export class UpdateUserMessageDto extends PartialType(CreateUserMessageDto) {
  @IsString()
  @IsNotEmpty()
  id: string;
}
