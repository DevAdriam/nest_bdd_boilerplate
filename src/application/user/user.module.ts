import { Module } from '@nestjs/common';
import { UserController } from 'src/presentation/controllers/user.controller';
import { UserService } from './user.service';
import { UserRepository } from 'src/domain/user/user.repository';

@Module({
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService, UserRepository],
})
export class UserModule {}
