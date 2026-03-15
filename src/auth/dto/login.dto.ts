import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'example@mail.ru' })
  @IsNotEmpty({ message: 'Email required' })
  email: string;

  @ApiProperty({ example: 'Password123' })
  @IsNotEmpty({ message: 'Password required' })
  password: string;
}
