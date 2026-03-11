import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ERole } from '../enums/roles.enum';

export class CreateUserDto {
  @ApiProperty()
  username: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  passwordHash: string;

  @ApiPropertyOptional()
  avatarUrl?: string;

  @ApiProperty({ enum: ERole, default: ERole.USER })
  role: ERole;
}
