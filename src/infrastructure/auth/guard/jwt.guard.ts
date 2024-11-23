import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from 'src/application/auth/auth.service';
import { UnauthorizedException } from 'src/core/exceptions/http/unauthorized.exception';

@Injectable()
export class JWTAuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const { authorization }: Request['headers'] = request.headers;

    if (!authorization) {
      throw new UnauthorizedException({
        message: 'authorization header is needed',
      });
    }

    const authToken = authorization.replaceAll(/bearer/gim, '').trim();
    const payload = await this.authService.verifyToken(authToken);

    if (!payload) {
      throw new UnauthorizedException({
        message: 'invalid token',
      });
    }

    request.user = payload;
    return true;
  }
}
