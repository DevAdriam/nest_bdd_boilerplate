import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { customErrorCodes } from 'src/common/constants/custom-errorcode';
import { BadRequestException } from 'src/core/exceptions/http/bad-request.exception';
import { NotFoundException } from 'src/core/exceptions/http/not-found.exception';
import { UnauthorizedException } from 'src/core/exceptions/http/unauthorized.exception';
import { UserEntity } from 'src/domain/user/user.entity';
import { UserRepository } from 'src/domain/user/user.repository';
import { Env } from 'src/infrastructure/config/env.config';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService<Env>,
  ) {}

  async register(dto: RegisterDto) {
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
    });
    return registerUser;
  }

  async login(dto: LoginDto) {
    const userExist = await this.userRepository.findByEmail(dto.email);
    if (!userExist) {
      throw new NotFoundException({
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

    const userEntity = new UserEntity(userExist);
    userEntity.active();

    if (!userEntity.getId()) {
      throw new BadRequestException({
        message: 'something went wrong',
      });
    }

    const updatedUser = await this.userRepository.updateStatus(
      userEntity.getStatus()!,
      userEntity.getId()!,
    );

    if (!updatedUser) {
      throw new BadRequestException({
        message: 'Failed to update user',
      });
    }

    const accessToken = await this.generateToken({ id: userExist.id });
    return accessToken;
  }

  async fetchProfile(id: string) {
    return this.userRepository.findById(id);
  }

  private async generateToken(payload: Record<string, unknown>) {
    return await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('JWT_SECRET_KEY'),
      expiresIn: this.configService.get<string>('TOKEN_EXPIRATION_TIME'),
    });
  }

  verifyToken(token: string): Promise<Record<string, unknown>> {
    return this.jwtService.verify(token, {
      secret: this.configService.get<string>('JWT_SECRET_KEY'),
    });
  }
}
