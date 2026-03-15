import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { AuthGuard } from '../../shared/common/guards/auth.guard';
import { RolesGuard } from 'src/shared/common/guards/roles.guard';
import { Roles } from 'src/users/decorators/roles.decorator';
import { ERole } from 'src/shared/common/enums/roles.enum';

export function ApiAdminAuth() {
  return applyDecorators(
    ApiBearerAuth('access-token'),
    ApiUnauthorizedResponse({ description: 'Неавторизован' }),
    Roles(ERole.ADMIN),
    UseGuards(AuthGuard, RolesGuard)
  );
}
