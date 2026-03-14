import { HashModule } from './shared/hash/hash.module';
import 'reflect-metadata';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './shared/database/database.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TokensModule } from './tokens/tokens.module';
import { CookieModule } from './shared/cookie/cookie.module';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    CookieModule,
    DatabaseModule,
    HashModule,
    TokensModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
