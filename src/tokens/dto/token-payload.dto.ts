import { ERole } from 'src/users/enums/roles.enum';

export class TokenPayloadDto {
  sub: number;
  role: ERole;
}
