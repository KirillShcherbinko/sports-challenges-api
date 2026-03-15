import { TokensService } from '../../../tokens/service/tokens.service';
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { IRequestWithUser } from '../../../auth/interfaces/request-with-user.interface';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private tokensService: TokensService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
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
  }
}
