import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JWTPayload } from 'src/common/types/type';
import { UnauthorizedException } from 'src/core/exceptions/http/unauthorized.exception';
import { UserRepository } from 'src/domain/user/user.repository';
import { Env } from 'src/infrastructure/config/env.config';

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy, 'jwt') {
  private readonly logger = new Logger(JWTStrategy.name);
  constructor(
    private readonly userRepository: UserRepository,
    private readonly configService: ConfigService<Env>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET_KEY'),
    });
    this.logger.log('JWTStrategy initialized');
  }

  async validate(payload: JWTPayload) {
    const foundUser = await this.userRepository.findById(payload.id);
    if (!foundUser) {
      throw new UnauthorizedException({
        message: 'User not found',
      });
    }
    return {
      id: payload.id,
    };
  }
}
