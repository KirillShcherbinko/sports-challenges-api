import { ERole } from '../../shared/common/enums/roles.enum';

export class CreateUserWithHashedPasswordDto {
  username: string;
  email: string;
  passwordHash: string;
  avatarUrl?: string;
  role: ERole;
}
