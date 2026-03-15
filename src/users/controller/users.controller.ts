import { Controller, Get, HttpStatus, HttpCode, UseGuards, Request, Body, Post, Delete, Param } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UsersService } from '../service/users.service';
import { ApiAuth } from 'src/auth/decorators/api-auth.decorator';
import { RolesGuard } from '../../shared/common/guards/roles.guard';
import { Roles } from '../decorators/roles.decorator';
import { ERole } from '../../shared/common/enums/roles.enum';
import { User } from '../entity/users.entity';
import type { IRequestWithUser } from 'src/auth/interfaces/request-with-user.interface';
import { CreateUserDto } from '../dto/create-user.dto';
import { HashService } from 'src/shared/hash/service/hash.service';
import { ApiAdminAuth } from 'src/auth/decorators/api-admin-auth.decorator';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private hashService: HashService
  ) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  @ApiAdminAuth()
  @ApiOperation({ summary: 'All users' })
  @ApiOkResponse({ description: 'Get all users', type: [User] })
  async findAll(): Promise<User[]> {
    return await this.usersService.findAll();
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  @ApiAuth()
  @ApiOperation({ summary: 'User by id' })
  @ApiOkResponse({ description: 'Get one user by id', type: User })
  async findOneById(@Param('id') id: number): Promise<User | null> {
    return await this.usersService.findOneById(id);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  @ApiAdminAuth()
  @ApiOperation({ summary: 'Create user' })
  @ApiCreatedResponse({ description: 'Create one user', type: User })
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    const passwordHash = await this.hashService.hash(createUserDto.password);

    return await this.usersService.create({
      username: createUserDto.username,
      email: createUserDto.email,
      passwordHash,
      avatarUrl: createUserDto.avatarUrl,
      role: createUserDto.role,
    });
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  @ApiAdminAuth()
  @ApiOperation({ summary: 'Delete user' })
  @ApiOkResponse({ description: 'Delete one user by id', type: [User] })
  async delete(@Param('id') id: number): Promise<void> {
    await this.usersService.delete(id);
  }
}
