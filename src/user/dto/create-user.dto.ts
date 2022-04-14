import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  user: string;

  @IsString()
  @IsOptional()
  name?: string;
}
