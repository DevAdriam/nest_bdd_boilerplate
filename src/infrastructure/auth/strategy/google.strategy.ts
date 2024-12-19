import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { VerifyCallback, Strategy } from 'passport-google-oauth2';
import { IGoogleProfile } from 'src/common/types/type';
import { Env } from 'src/infrastructure/config/env.config';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private configService: ConfigService<Env>) {
    super({
      clientID: configService.get<string>('GOOGLE_CLIENT_ID'),
      clientSecret: configService.get<string>('GOOGLE_CLIENT_SECRET'),
      callbackURL: configService.get<string>('GOOGLE_CALLBACK_URL'),
      scope: ['profile', 'email'],
    });
  }

  validate(
    _accessToken: string,
    _refreshToken: string,
    profile: IGoogleProfile,
    done: VerifyCallback,
  ) {
    const { id, displayName, emails, photos } = profile;

    const user = {
      googleId: id,
      fullName: displayName,
      email: emails?.[0]?.value,
      avatar: photos?.[0]?.value,
    };

    done(undefined, user);
  }
}
