import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { Request } from 'express';
import { AuthService } from 'src/application/auth/auth.service';
import { LoginDto } from 'src/application/auth/dto/login.dto';
import { RegisterDto } from 'src/application/auth/dto/register.dto';
import { User as ValidateUser } from 'src/common/decorators/user.decorator';
import { IAuthUser } from 'src/common/types/type';
import { BadRequestException } from 'src/core/exceptions/http/bad-request.exception';
import { GoogleAuthGuard } from 'src/infrastructure/auth/guard/google.guard';
import { JWTAuthGuard } from 'src/infrastructure/auth/guard/jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('register')
  @ApiBody({
    type: RegisterDto,
  })
  @HttpCode(200)
  async register(@Body() dto: RegisterDto): Promise<User> {
    try {
      const registeredUser = await this.authService.register(dto);
      return registeredUser!;
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException({
          message: error.message,
        });
      }

      throw new BadRequestException({
        message: 'failed to register',
      });
    }
  }

  @Post('login')
  @ApiBody({
    type: LoginDto,
  })
  @HttpCode(200)
  async login(@Body() dto: LoginDto): Promise<string> {
    try {
      const accessToken = await this.authService.login(dto);
      return accessToken;
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException({
          message: error.message,
        });
      }

      throw new BadRequestException({
        message: 'failed to register',
      });
    }
  }

  @Get('me')
  @ApiBearerAuth()
  @UseGuards(JWTAuthGuard)
  async fetchProfile(@ValidateUser() user: IAuthUser): Promise<User> {
    try {
      const me = await this.authService.fetchProfile(user.id);
      return me!;
    } catch {
      throw new BadRequestException({
        message: 'failed to fetch profile',
      });
    }
  }

  @Get('google')
  @UseGuards(GoogleAuthGuard)
  loginWithGoogle() {
    return 'hehe';
  }

  @Get('google/redirect')
  @UseGuards(GoogleAuthGuard)
  googleAuthRedirect(@Req() req: Request) {
    return req.user;
  }
}
