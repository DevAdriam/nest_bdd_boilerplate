import { Injectable } from '@nestjs/common';
import { customErrorCodes } from 'src/common/constants/custom-errorcode';
import { BadRequestException } from 'src/core/exceptions/http/bad-request.exception';
import { UserService } from '../user/user.service';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async register(dto: RegisterDto) {
    const hashPassword = dto.password;

    if (!dto.email && !dto.phone) {
      throw new BadRequestException({
        message: 'user must have phone or password',
        code: customErrorCodes.INVALID_JSON,
      });
    }

    if (dto.email && dto.phone) {
      throw new BadRequestException({
        message: 'please choose register method with email or phone',
      });
    }

    const registerUser = await this.userService.registerUser({
      ...dto,
      password: hashPassword,
    });
    return registerUser;
  }
}
