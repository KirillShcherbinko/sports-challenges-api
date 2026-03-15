import { SetMetadata } from '@nestjs/common';
import { ERole } from '../../shared/common/enums/roles.enum';
import { ROLES_KEY } from '../../shared/common/constants/roles.constants';

export const Roles = (...roles: ERole[]) => SetMetadata(ROLES_KEY, roles);
