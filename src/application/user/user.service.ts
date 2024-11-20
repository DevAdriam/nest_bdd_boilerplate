import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../domain/user/user.repository';
import { UserEntity } from '../../domain/user/user.entity';
import { RegisterDto } from '../auth/dto/register.dto';
import { User } from '@prisma/client';
import { BadRequestException } from 'src/core/exceptions/http/bad-request.exception';
import { customErrorCodes } from 'src/common/constants/custom-errorcode';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}
  async suspendUser(userId: string): Promise<User> {
    const userExist = await this.userRepository.findById(userId);
    if (!userExist) {
      throw new BadRequestException({
        message: 'user not found',
      });
    }

    const userEntity = new UserEntity(userExist);
    userEntity.suspend();

    const updatedUser = await this.userRepository.updateStatus(
      userEntity.getStatus(),
      userExist.id,
    );
    return updatedUser;
  }

  async registerUser(dto: RegisterDto) {
    if (dto.email) {
      const duplicatedUser = await this.userRepository.findByEmail(dto.email);
      if (duplicatedUser) {
        throw new BadRequestException({
          message: 'User duplicated',
        });
      }
    }
    const userEntity = new UserEntity({
      phone: dto.phone,
      email: dto.email,
      name: dto.name,
      status: 'REGISTERED',
    });

    const emailValid = userEntity.isValidEmail();
    if (!emailValid) {
      throw new BadRequestException({
        message: 'email is not valid',
        code: customErrorCodes.INVALID_JSON,
      });
    }
    userEntity.hashPassword();

    const savedUser = await this.userRepository.create(
      userEntity.toPersistance(),
    );

    return savedUser;
  }
}
