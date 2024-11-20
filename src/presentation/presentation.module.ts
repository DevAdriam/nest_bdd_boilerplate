import { Module } from '@nestjs/common';
import { AuthModule } from 'src/application/auth/auth.module';
import { UserModule } from 'src/application/user/user.module';
import { AuthController } from './controllers/auth.controller';
import { UserController } from './controllers/user.controller';

@Module({
  imports: [UserModule, AuthModule],
  controllers: [UserController, AuthController],
  providers: [],
})
export class PresentationModule {}
