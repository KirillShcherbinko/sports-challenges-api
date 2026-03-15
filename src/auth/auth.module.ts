import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { AuthController } from './controller/auth.controller';
import { UsersModule } from '../users/users.module';
import { TokensModule } from 'src/tokens/tokens.module';

@Module({
  imports: [TokensModule, forwardRef(() => UsersModule)],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
