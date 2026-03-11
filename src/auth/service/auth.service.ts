import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { HashService } from '../../shared/hash/service/hash.service';
import { TokensService } from '../../tokens/service/tokens.service';
import { UsersService } from '../../users/service/users.service';
import { AuthResponseDto } from '../dto/auth-response.dto';
import { ERole } from 'src/users/enums/roles.enum';

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
      throw new UnauthorizedException('Invalid credentials');
    }

    const isValid = await this.hashService.compare(password, user.passwordHash);
    if (!isValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const { accessToken, refreshToken } = await this.tokensService.generateTokens(user.id, user.role);
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

  async register(username: string, email: string, password: string): Promise<AuthResponseDto> {
    const isUserExists = await this.usersService.findOneByEmail(email);
    if (!!isUserExists) {
      throw new ConflictException('User alredy exists');
    }

    const passwordHash = await this.hashService.hash(password);

    const user = await this.usersService.createUser({
      username,
      email,
      passwordHash,
      role: ERole.USER,
    });

    const { accessToken, refreshToken } = await this.tokensService.generateTokens(user.id, user.role);
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

  async logout(refreshToken: string): Promise<void> {
    await this.tokensService.deleteToken(refreshToken);
  }

  async refresh(oldRefreshToken: string): Promise<AuthResponseDto> {
    const decoded = await this.tokensService.validateRefreshToken(oldRefreshToken);

    const storedToken = await this.tokensService.findToken(oldRefreshToken);
    if (!storedToken) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    if (storedToken.refreshToken !== oldRefreshToken) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const user = await this.usersService.findOneById(decoded.sub);
    if (!user) {
      throw new UnauthorizedException('Invalid user');
    }

    const { accessToken, refreshToken } = await this.tokensService.generateTokens(user.id, user.role);
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
