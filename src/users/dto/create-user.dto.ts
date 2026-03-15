import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ERole } from '../../shared/common/enums/roles.enum';
import { IsString, IsNotEmpty, MinLength, MaxLength, IsEmail, Matches, IsOptional, IsEnum } from 'class-validator';
import {
  MIN_USERNAME_LENGTH,
  MAX_USERNAME_LENGTH,
  MIN_PASSWORD_LENGTH,
  MAX_PASSWORD_LENGTH,
} from 'src/auth/constants/auth.constants';

export class CreateUserDto {
  @ApiProperty({ example: 'mirill_kirkin' })
  @IsString()
  @IsNotEmpty({ message: 'Username is required' })
  @MinLength(MIN_USERNAME_LENGTH, { message: `Min username length: ${MIN_USERNAME_LENGTH}` })
  @MaxLength(MAX_USERNAME_LENGTH, { message: `Max username length: ${MAX_USERNAME_LENGTH}` })
  username: string;

  @ApiProperty({ example: 'example@mail.ru' })
  @IsEmail({}, { message: 'Invalid email' })
  @IsNotEmpty({ message: 'Email required' })
  email: string;

  @ApiProperty({ example: 'Password123' })
  @IsString()
  @IsNotEmpty({ message: 'Password required' })
  @MinLength(MIN_PASSWORD_LENGTH, { message: `Min password length: ${MIN_PASSWORD_LENGTH}` })
  @MaxLength(MAX_PASSWORD_LENGTH, { message: `Max password length: ${MAX_PASSWORD_LENGTH}` })
  @Matches(/[0-9]/, { message: 'Password must include a number' })
  @Matches(/[A-ZА-Я]/, { message: 'Password must include a capital letter' })
  password: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  avatarUrl?: string;

  @ApiProperty({ enum: ERole, default: ERole.USER })
  @IsEnum(ERole, { message: 'There is no such role' })
  role: ERole;
}
