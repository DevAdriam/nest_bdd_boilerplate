import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepository } from '../../domain/user/user.repository';
import { UserEntity } from '../../domain/user/user.entity';
import { RegisterDto } from '../auth/dto/register.dto';
import { User } from '@prisma/client';

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
    const duplicatedUser = await this.userRepository.findByEmail(dto.email);
    if (duplicatedUser) {
      throw new BadRequestException({
        message: 'User duplicated',
      });
    }

    const newUser = await this.userRepository.create(dto);
    return newUser;
  }
}
