import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { MessageType } from 'src/shared/enum/message-type.enum';

export class CreateMessageDto {
  @IsString()
  @IsNotEmpty()
  type: MessageType;

  @IsNumber()
  @IsNotEmpty()
  sortOrder: number;

  @IsString()
  @IsNotEmpty()
  code: string;

  @IsString()
  @IsNotEmpty()
  message: string;

  @IsString()
  jsonOptions?: any;
}
