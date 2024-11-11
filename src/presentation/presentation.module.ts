import { Module } from '@nestjs/common';
import { UserModule } from 'src/application/user/user.module';
import { UserController } from './controllers/user.controller';
import { AuthModule } from 'src/application/auth/auth.module';
import { AuthController } from './controllers/auth.controller';

@Module({
  imports: [UserModule, AuthModule],
  controllers: [UserController, AuthController],
  providers: [],
})
export class PresentationModule {}
