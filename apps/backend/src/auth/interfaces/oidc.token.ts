import { TokenSetParameters } from 'openid-client';
import { User } from '../../user/entities/user.entity';

export interface OidcToken {
  user: User;
  token: TokenSetParameters;
}
