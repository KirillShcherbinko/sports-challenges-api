import { Global, Module } from '@nestjs/common';
import { TokensModule } from 'src/tokens/tokens.module';
import { RolesGuard } from './guards/roles.guard';
import { AuthGuard } from './guards/auth.guard';

Global();
@Module({
  imports: [TokensModule],
  providers: [AuthGuard, RolesGuard],
  exports: [AuthGuard, RolesGuard],
})
export class CommonModule {}
