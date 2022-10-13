import {
  Client,
  Issuer,
  Strategy,
  TokenSet,
  UserinfoResponse,
} from 'openid-client';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { OidcToken } from './interfaces/oidc.token';
import { User } from '../user/entities/user.entity';

export const buildOpenIdClient = async () => {
  const issuer = await Issuer.discover(
    `${process.env.OIDC_PROVIDER}/.well-known/openid-configuration`,
  );
  return new issuer.Client({
    client_id: process.env.OIDC_CLIENT_ID,
    client_secret: process.env.OIDC_CLIENT_SECRET,
  });
};

@Injectable()
export class OidcStrategy extends PassportStrategy(Strategy, 'oidc') {
  constructor(
    private readonly authService: AuthService,
    private client: Client,
  ) {
    super({
      client,
      params: {
        redirect_uri: process.env.OIDC_REDIRECT_URI,
        scope: process.env.OIDC_SCOPE,
      },
      passReqToCallback: false,
      usePKCE: false,
    });

    this.client = client;
  }

  async validate(tokenSet: TokenSet): Promise<OidcToken | any> {
    const federatedUser: UserinfoResponse = await this.client.userinfo(
      tokenSet,
    );
    const localUser: User = await this.authService.fetchUser(federatedUser);

    try {
      return {
        id_token: tokenSet.id_token,
        access_token: tokenSet.access_token,
        refresh_token: tokenSet.refresh_token,
        user: localUser,
      };
    } catch (err) {
      throw new UnauthorizedException();
    }
  }
}
