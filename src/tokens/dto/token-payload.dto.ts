import { ERole } from 'src/shared/common/enums/roles.enum';

export class TokenPayloadDto {
  sub: number;
  role: ERole;
}
