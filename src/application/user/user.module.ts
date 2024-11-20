import { Module } from '@nestjs/common';
import { UserRepository } from 'src/domain/user/user.repository';
import { UserController } from 'src/presentation/controllers/user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService, UserRepository],
})
export class UserModule {}
