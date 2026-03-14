import { Module } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { AuthController } from './controller/auth.controller';
import { UsersModule } from '../users/users.module';
import { TokensModule } from 'src/tokens/tokens.module';
import { AuthGuard } from './guards/auth.guard';

@Module({
  imports: [TokensModule, UsersModule],
  providers: [AuthService, AuthGuard],
  controllers: [AuthController],
  exports: [AuthService, AuthGuard],
})
export class AuthModule {}
