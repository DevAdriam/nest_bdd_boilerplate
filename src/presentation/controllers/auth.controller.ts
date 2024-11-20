import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { AuthService } from 'src/application/auth/auth.service';
import { RegisterDto } from 'src/application/auth/dto/register.dto';
import { Responser } from 'src/common/types/type';
import { BadRequestException } from 'src/core/exceptions/http/bad-request.exception';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('register')
  @ApiBody({
    type: RegisterDto,
  })
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
}
