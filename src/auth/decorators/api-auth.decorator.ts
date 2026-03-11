import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';
//import { JwtAuthGuard } from '../guards/jwt-auth.guard';

export function ApiAuth() {
  return applyDecorators(
    ApiBearerAuth('access-token'),
    ApiUnauthorizedResponse({ description: 'Неавторизован' }),
    //UseGuards(JwtAuthGuard)
  );
}
