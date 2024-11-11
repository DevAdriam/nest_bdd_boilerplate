import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepository } from '../../../domain/user/user.repository';
import { UserEntity } from '../../../domain/user/user.entity';

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
    return updatedUser;
  }
}
