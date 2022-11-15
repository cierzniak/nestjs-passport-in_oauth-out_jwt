import { Request } from 'express';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { randomUUID } from 'crypto';
import {
  StateStoreStoreCallback,
  StateStoreVerifyCallback,
  Strategy,
  VerifyCallback,
} from 'passport-oauth2';
import { parseJwtData } from './utils/jwt';

@Injectable()
export class Oauth2Strategy extends PassportStrategy(Strategy, 'ouath2') {
  constructor(private readonly configService: ConfigService) {
    super({
      authorizationURL: configService.get<string>('oauth2.url.authorization'),
      tokenURL: configService.get<string>('oauth2.url.token'),
      callbackURL: configService.get<string>('oauth2.url.callback'),
      clientID: configService.get<string>('oauth2.client.id'),
      clientSecret: configService.get<string>('oauth2.client.secret'),
      scope: configService.get<string>('oauth2.scope'),
      store: {
        store: (req: Request, callback: StateStoreStoreCallback) =>
          callback(null, randomUUID()),
        verify: (
          req: Request,
          state: string,
          callback: StateStoreVerifyCallback,
        ) => callback(null, true, state),
      },
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    callback: VerifyCallback,
  ): Promise<any> {
    const { name, preferred_username, email } = parseJwtData(accessToken);
    callback(null, { name, username: preferred_username, email });
  }
}
