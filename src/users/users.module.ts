import { Module } from '@nestjs/common';
import { usersProviders } from './providers/users.providers';
import { UsersService } from './service/users.service';
import { RolesGuard } from './guards/roles.guard';
import { UsersController } from './controller/users.controller';

@Module({
  providers: [...usersProviders, UsersService, RolesGuard],
  controllers: [UsersController],
  exports: [UsersService, RolesGuard],
})
export class UsersModule {}
