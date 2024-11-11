import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { RegisterDto } from './dto/register.dto';
import { BadRequestException } from 'src/core/exceptions/http/bad-request.exception';
import { customErrorCodes } from 'src/common/constants/custom-errorcode';

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

    const registerUser = await this.userService.registerUser({
      ...dto,
      password: hashPassword,
    });
    return registerUser;
  }
}
