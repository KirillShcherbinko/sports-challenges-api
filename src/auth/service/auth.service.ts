import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { HashService } from '../../shared/hash/service/hash.service';
import { TokensService } from '../../tokens/service/tokens.service';
import { UsersService } from '../../users/service/users.service';
import { AuthResponseDto } from '../dto/auth-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private hashService: HashService,
    private tokensService: TokensService
  ) {}

  async login(email: string, password: string): Promise<AuthResponseDto> {
    const user = await this.usersService.findOneByEmail(email);

    if (!user) {
      throw new NotFoundException(`User with email: ${email} not found`);
    }

    const isValid = await this.hashService.compare(password, user.passwordHash);
    if (isValid) {
      throw new UnauthorizedException('Invalid password');
    }

    const { accessToken, refreshToken } = await this.tokensService.generateTokens(user.id);
    await this.tokensService.saveToken(user.id, refreshToken);

    return {
      accessToken,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    };
  }
}
