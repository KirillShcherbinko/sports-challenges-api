import { Module } from '@nestjs/common';
import { usersProviders } from './providers/users.providers';
import { UsersService } from './service/users.service';
import { UsersController } from './controller/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/users.entity';
import { TokensModule } from 'src/tokens/tokens.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), TokensModule],
  providers: [...usersProviders, UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
