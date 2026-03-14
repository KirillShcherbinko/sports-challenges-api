import { SetMetadata } from '@nestjs/common';
import { ERole } from '../enums/roles.enum';
import { ROLES_KEY } from '../constants/roles.constants';

export const Roles = (...roles: ERole[]) => SetMetadata(ROLES_KEY, roles);
