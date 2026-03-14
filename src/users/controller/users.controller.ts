import { Controller, Get, HttpStatus, HttpCode, UseGuards, Request, Body, Post, Delete } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UsersService } from '../service/users.service';
import { ApiAuth } from 'src/auth/decorators/api-auth.decorator';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from '../decorators/roles.decorator';
import { ERole } from '../enums/roles.enum';
import { User } from '../entity/users.entity';
import type { IRequestWithUser } from 'src/auth/interfaces/request-with-user.interface';
import { CreateUserDto } from '../dto/create-user.dto';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  @ApiAuth()
  @Roles(ERole.ADMIN)
  @UseGuards(RolesGuard)
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
  async findOneById(@Request() req: IRequestWithUser): Promise<User | null> {
    const { id } = req.user;
    return await this.usersService.findOneById(id);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  @ApiAuth()
  @Roles(ERole.ADMIN)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Create user' })
  @ApiCreatedResponse({ description: 'Create one user', type: User })
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.usersService.create(createUserDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  @ApiAuth()
  @Roles(ERole.ADMIN)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Delete user' })
  @ApiOkResponse({ description: 'Delete one user by id', type: [User] })
  async delete(@Request() req: IRequestWithUser): Promise<void> {
    const { id } = req.user;
    return await this.usersService.delete(id);
  }
}
