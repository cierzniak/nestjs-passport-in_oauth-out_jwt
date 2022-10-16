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
import { ConfigService } from '@nestjs/config';

export const buildOpenIdClient = async (
  provider: string,
  clientId: string,
  clientSecret: string,
) => {
  const issuer = await Issuer.discover(
    `${provider}/.well-known/openid-configuration`,
  );
  return new issuer.Client({
    client_id: clientId,
    client_secret: clientSecret,
  });
};

@Injectable()
export class OidcStrategy extends PassportStrategy(Strategy, 'oidc') {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
    private client: Client,
  ) {
    super({
      client,
      params: {
        redirect_uri: configService.get('oidc.redirectUrl'),
        scope: configService.get('oidc.scope'),
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
        user: localUser,
        token: tokenSet,
      };
    } catch (err) {
      throw new UnauthorizedException();
    }
  }
}
