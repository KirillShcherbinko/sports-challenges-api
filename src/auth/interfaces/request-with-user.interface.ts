import { Request } from 'express';
import { ERole } from 'src/shared/common/enums/roles.enum';

export interface IRequestWithUser extends Request {
  user: {
    id: number;
    role: ERole;
  };
}
