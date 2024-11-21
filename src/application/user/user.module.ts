import { Module } from '@nestjs/common';
import { HashService } from 'src/common/service/hash.service';
import { UserRepository } from 'src/domain/user/user.repository';
import { UserController } from 'src/presentation/controllers/user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [UserService, UserRepository, HashService],
  exports: [UserService, UserRepository, HashService],
})
export class UserModule {}
