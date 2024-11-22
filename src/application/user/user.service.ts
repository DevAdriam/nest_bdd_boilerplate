import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { HashService } from 'src/common/service/hash.service';
import { BadRequestException } from 'src/core/exceptions/http/bad-request.exception';
import { UserEntity } from '../../domain/user/user.entity';
import { UserRepository } from '../../domain/user/user.repository';
import { RegisterDto } from '../auth/dto/register.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashService: HashService,
  ) {}
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
    if (!updatedUser) {
      throw new BadRequestException({
        message: 'failed to update user',
      });
    }
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

    const hashPassword = await this.hashPassword(dto.password);
    userEntity.updatePassword(hashPassword);

    const savedUser = await this.userRepository.create(
      userEntity.toPersistance(),
    );

    return savedUser;
  }

  async hashPassword(password: string) {
    return await this.hashService.hash(password);
  }

  async verifyPassword(password: string, hashedPassword: string) {
    return await this.hashService.compare(password, hashedPassword);
  }
}
