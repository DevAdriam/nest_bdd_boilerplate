import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { customErrorCodes } from 'src/common/constants/custom-errorcode';
import { BadRequestException } from 'src/core/exceptions/http/bad-request.exception';
import { UnauthorizedException } from 'src/core/exceptions/http/unauthorized.exception';
import { UserRepository } from 'src/domain/user/user.repository';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

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

  async login(dto: LoginDto) {
    const userExist = await this.userRepository.findByEmail(dto.email);
    if (!userExist) {
      throw new UnauthorizedException({
        message: 'user not found',
      });
    }

    const verifyPassword = await this.userService.verifyPassword(
      dto.password,
      userExist.password,
    );

    if (!verifyPassword) {
      throw new UnauthorizedException({
        message: 'wrong password',
      });
    }

    const accessToken = await this.generateToken({ id: userExist.id });
    return accessToken;
  }

  private async generateToken(payload: Record<string, unknown>) {
    return await this.jwtService.signAsync(payload, {
      secret: '',
      expiresIn: '1d',
    });
  }
}
