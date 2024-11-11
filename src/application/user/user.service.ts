import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { BadRequestException } from 'src/core/exceptions/http/bad-request.exception';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}
  async suspendUser(userId: string) {
    const userExist = await this.userRepository.findById(userId);
    if (!userExist) {
      throw new BadRequestException({
        message: 'user not found',
      });
    }

    const userEntity = new UserEntity(userExist);

    userEntity.suspend();
    const updatedUser = await this.userRepository.update();
  }
}
