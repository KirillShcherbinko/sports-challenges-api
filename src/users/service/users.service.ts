import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { USERS_REPOSITORY } from '../constants/users.constants';
import { Repository } from 'typeorm';
import { User } from '../entity/users.entity';
import { CreateUserWithHashedPasswordDto } from '../dto/create-user-with-hashed-password';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USERS_REPOSITORY)
    private usersRespository: Repository<User>
  ) {}

  async findAll(): Promise<User[]> {
    return await this.usersRespository.find();
  }

  async findOneById(userId: number): Promise<User> {
    const user = await this.usersRespository.findOneBy({ id: userId });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return await this.usersRespository.findOneBy({ email });
  }

  async create(createUserDto: CreateUserWithHashedPasswordDto): Promise<User> {
    const newUser = this.usersRespository.create(createUserDto);

    return await this.usersRespository.save(newUser);
  }

  async delete(userId: number): Promise<void> {
    const result = await this.usersRespository.delete({ id: userId });

    if (!result) {
      throw new NotFoundException('User not found');
    }
  }
}
