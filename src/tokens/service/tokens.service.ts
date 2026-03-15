import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { TokenPairDto } from '../dto/token-pair.dto';
import { TOKENS_REPOSITORY } from '../constants/tokens.constants';
import { Repository } from 'typeorm';
import { Token } from '../entity/tokens.entity';
import { ERole } from 'src/shared/common/enums/roles.enum';
import { TokenPayloadDto } from '../dto/token-payload.dto';
import { User } from 'src/users/entity/users.entity';

@Injectable()
export class TokensService {
  constructor(
    @Inject(TOKENS_REPOSITORY)
    private tokensRepository: Repository<Token>,
    private configService: ConfigService,
    private jwtService: JwtService
  ) {}

  async generateTokens(userId: number, role: ERole): Promise<TokenPairDto> {
    const payload = { sub: userId, role };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
        expiresIn: '15m',
      }),
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
        expiresIn: '7d',
      }),
    ]);

    return { accessToken, refreshToken };
  }

  async validateAccessToken(accessToken: string): Promise<TokenPayloadDto> {
    try {
      return await this.jwtService.verifyAsync<TokenPayloadDto>(accessToken, {
        secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
      });
    } catch {
      throw new UnauthorizedException('Invalid access token');
    }
  }

  async validateRefreshToken(refreshToken: string): Promise<TokenPayloadDto> {
    try {
      return await this.jwtService.verifyAsync<TokenPayloadDto>(refreshToken, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      });
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async saveToken(user: User, refreshToken: string): Promise<Token> {
    const tokenData = await this.tokensRepository.findOne({
      where: {
        user: { id: user.id },
      },
    });

    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return await this.tokensRepository.save(tokenData);
    }

    const newToken = this.tokensRepository.create({ user, refreshToken });
    return await this.tokensRepository.save(newToken);
  }

  async deleteToken(userId: number): Promise<void> {
    await this.tokensRepository.delete({ user: { id: userId } });
  }

  async findToken(refreshToken: string): Promise<Token | null> {
    return await this.tokensRepository.findOneBy({ refreshToken });
  }
}
