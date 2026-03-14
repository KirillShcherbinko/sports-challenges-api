import { TokensService } from './../../tokens/service/tokens.service';
import { CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { IRequestWithUser } from '../interfaces/request-with-user.interface';

export class AuthGuard implements CanActivate {
  constructor(private tokensService: TokensService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest<IRequestWithUser>();
      const accessToken = request.headers.authorization?.split(' ')[1];
      if (!accessToken) {
        throw new UnauthorizedException('Token not found');
      }

      const { sub, role } = await this.tokensService.validateAccessToken(accessToken);

      request.user = {
        id: sub,
        role,
      };

      return true;
    } catch (_error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
