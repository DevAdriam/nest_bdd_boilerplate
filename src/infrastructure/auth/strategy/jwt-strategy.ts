import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JWTPayload } from 'src/common/types/type';
import { UnauthorizedException } from 'src/core/exceptions/http/unauthorized.exception';
import { UserRepository } from 'src/domain/user/user.repository';

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userRepository: UserRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: '',
    });
  }

  async validate(payload: JWTPayload) {
    const foundUserByEmail = await this.userRepository.findById(payload.id);
    if (!foundUserByEmail) {
      throw new UnauthorizedException({
        message: 'User not found',
      });
    }
    return foundUserByEmail;
  }
}
