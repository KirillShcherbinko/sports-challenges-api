import { Module } from '@nestjs/common';
import { usersProviders } from './providers/users.providers';
import { UsersService } from './service/users.service';

@Module({
  imports: [],
  providers: [...usersProviders, UsersService],
})
export class UsersModule {}
