import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { AuthService } from 'src/application/auth/auth.service';
import { LoginDto } from 'src/application/auth/dto/login.dto';
import { RegisterDto } from 'src/application/auth/dto/register.dto';
import { User } from 'src/common/decorators/user.decorator';
import { IAuthUser, Responser } from 'src/common/types/type';
import { BadRequestException } from 'src/core/exceptions/http/bad-request.exception';
import { JWTAuthGuard } from 'src/infrastructure/auth/guard/jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('register')
  @ApiBody({
    type: RegisterDto,
  })
  @HttpCode(200)
  async register(@Body() dto: RegisterDto): Promise<Responser> {
    try {
      const registeredUser = await this.authService.register(dto);
      return {
        _metaData: {
          statusCode: HttpStatus.CREATED,
          message: 'Success',
        },
        _data: {
          data: registeredUser,
        },
      };
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
  async login(@Body() dto: LoginDto): Promise<Responser> {
    try {
      const tokens = await this.authService.login(dto);
      return {
        _metaData: {
          statusCode: HttpStatus.CREATED,
          message: 'Success',
        },
        _data: {
          data: {
            accessToken: tokens,
          },
        },
      };
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
  async fetchProfile(@User() user: IAuthUser): Promise<Responser> {
    try {
      const me = await this.authService.fetchProfile(user.id);
      return {
        success: true,
        _metaData: {
          statusCode: HttpStatus.OK,
          message: 'Succcessfully fetched profile',
        },
        _data: {
          data: me,
        },
      };
    } catch {
      throw new BadRequestException({
        message: 'failed to fetch profile',
      });
    }
  }
}
