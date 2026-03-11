import { IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsNotEmpty({ message: 'Email required' })
  email: string;

  @IsNotEmpty({ message: 'Password required' })
  password: string;
}
