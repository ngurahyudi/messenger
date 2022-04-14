import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUserMessageDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  messageId: string;

  @IsString()
  @IsOptional()
  responseId?: string;

  @IsString()
  @IsOptional()
  response?: string;

  @IsString()
  @IsOptional()
  jsonResponse?: string;
}
