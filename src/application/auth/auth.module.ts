import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { GoogleStrategy } from 'src/infrastructure/auth/strategy/google.strategy';
import { JWTStrategy } from 'src/infrastructure/auth/strategy/jwt-strategy';
import { AuthController } from 'src/presentation/controllers/auth.controller';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';

@Module({
  imports: [
    UserModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      global: true,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtService, JWTStrategy, GoogleStrategy],
  exports: [AuthService],
})
export class AuthModule {}
