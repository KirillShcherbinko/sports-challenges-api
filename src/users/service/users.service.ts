import { Inject, Injectable } from '@nestjs/common';
import { USERS_REPOSITORY } from '../constants/users.constants';
import { Repository } from 'typeorm';
import { User } from '../entity/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USERS_REPOSITORY)
    private usersRespository: Repository<User>
  ) {}

  async findAll(): Promise<User[]> {
    return await this.usersRespository.find();
  }
}
