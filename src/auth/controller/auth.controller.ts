import { CookieService } from './../../shared/cookie/service/cookie.service';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request as Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { LoginDto } from '../dto/login.dto';
import { RegisterDto } from '../dto/register.dto';
import type { Request, Response } from 'express';
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthHandledResponseDto } from '../dto/auth-handled-response.dto';
import { ApiAuth } from '../decorators/api-auth.decorator';
import type { IRequestWithUser } from '../interfaces/request-with-user.interface';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private cookieService: CookieService
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiOperation({ summary: 'Login' })
  @ApiOkResponse({ description: 'User is logged in', type: AuthHandledResponseDto })
  @ApiUnauthorizedResponse({ description: 'Invalid credintial' })
  async login(@Body() loginDto: LoginDto, @Res({ passthrough: true }) res: Response): Promise<AuthHandledResponseDto> {
    const { accessToken, refreshToken, user } = await this.authService.login(loginDto.email, loginDto.password);
    this.cookieService.setCookie(res, refreshToken);
    return { accessToken, user };
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  @ApiOperation({ summary: 'Register' })
  @ApiCreatedResponse({ description: 'New user is registered', type: AuthHandledResponseDto })
  @ApiConflictResponse({ description: 'User already exists' })
  async register(
    @Body() registerDto: RegisterDto,
    @Res({ passthrough: true }) res: Response
  ): Promise<AuthHandledResponseDto> {
    const { accessToken, refreshToken, user } = await this.authService.register(
      registerDto.username,
      registerDto.email,
      registerDto.password
    );
    this.cookieService.setCookie(res, refreshToken);
    return { accessToken, user };
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('logout')
  @ApiAuth()
  @ApiOperation({ summary: 'Logout' })
  @ApiNoContentResponse({ description: 'Success logout' })
  async logout(@Req() req: IRequestWithUser, @Res({ passthrough: true }) res: Response): Promise<void> {
    const { refreshToken } = req.cookies;
    await this.authService.logout(refreshToken);
    this.cookieService.clearCookie(res);
  }

  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  @ApiOperation({ summary: 'Refresh access token' })
  @ApiOkResponse({ description: 'Access token refreshed', type: AuthHandledResponseDto })
  @ApiUnauthorizedResponse({ description: 'Invalid refresh token or user' })
  async refresh(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<AuthHandledResponseDto> {
    const { refreshToken: oldRefreshToken } = req.cookies;
    if (!oldRefreshToken) {
      throw new UnauthorizedException('Refresh token not found');
    }

    const { accessToken, refreshToken, user } = await this.authService.refresh(oldRefreshToken);
    this.cookieService.setCookie(res, refreshToken);
    return { accessToken, user };
  }
}
