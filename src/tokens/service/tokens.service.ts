import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { GenerateTokensResponseDto } from '../dto/generate-tokens-response.dto';
import { TOKENS_REPOSITORY } from '../constants/tokens.constants';
import { InsertResult, Repository } from 'typeorm';
import { Token } from '../entity/tokens.entity';

@Injectable()
export class TokensService {
  constructor(
    @Inject(TOKENS_REPOSITORY)
    private tokensRepository: Repository<Token>,
    private configService: ConfigService,
    private jwtService: JwtService
  ) {}

  async generateTokens(userId: number): Promise<GenerateTokensResponseDto> {
    const payload = { sub: userId };

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

  async saveToken(userId: number, refreshToken: string): Promise<InsertResult> {
    return await this.tokensRepository.upsert({ userId, refreshToken }, ['userId']);
  }
}
