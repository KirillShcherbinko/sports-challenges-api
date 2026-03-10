import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TokensService } from './service/tokens.service';
import { tokensProviders } from './providers/tokens.providers';

@Module({
  imports: [JwtModule.register({})],
  providers: [...tokensProviders, TokensService],
  exports: [TokensService],
})
export class TokensModule {}
