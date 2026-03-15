import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TokensService } from './service/tokens.service';
import { tokensProviders } from './providers/tokens.providers';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Token } from './entity/tokens.entity';

@Module({
  imports: [JwtModule.register({}), TypeOrmModule.forFeature([Token])],
  providers: [...tokensProviders, TokensService],
  exports: [TokensService],
})
export class TokensModule {}
