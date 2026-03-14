import { ApiProperty } from '@nestjs/swagger';

export class AuthHandledResponseDto {
  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  user: {
    id: number;
    username: string;
    email: string;
  };
}
