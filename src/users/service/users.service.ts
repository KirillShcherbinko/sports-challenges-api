import { Inject, Injectable } from '@nestjs/common';
import { USERS_REPOSITORY } from '../constants/users.constants';
import { Repository } from 'typeorm';
import { User } from '../entity/users.entity';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USERS_REPOSITORY)
    private usersRespository: Repository<User>
  ) {}

  async findAll(): Promise<User[]> {
    return await this.usersRespository.find();
  }

  async findOneById(userId: number): Promise<User | null> {
    return await this.usersRespository.findOneBy({ id: userId });
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return await this.usersRespository.findOneBy({ email });
  }

  async createUser(createUserDto: CreateUserDto) {
    const newUser = this.usersRespository.create(createUserDto);

    return await this.usersRespository.save(newUser);
  }
}
