import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { buildOpenIdClient, OidcStrategy } from './oidc.strategy';
import { SessionSerializer } from './session.serializer';
import { UserModule } from '../user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

const OidcStrategyFactory = {
  provide: 'OidcStrategy',
  useFactory: async (
    authService: AuthService,
    configService: ConfigService,
  ) => {
    return new OidcStrategy(
      configService,
      authService,
      await buildOpenIdClient(
        configService.get('oidc.providerUrl'),
        configService.get('oidc.clientId'),
        configService.get('oidc.clientSecret'),
      ),
    );
  },
  inject: [AuthService, ConfigService],
};

@Module({
  controllers: [AuthController],
  providers: [OidcStrategyFactory, SessionSerializer, AuthService],
  imports: [
    ConfigModule,
    PassportModule.register({ session: true, defaultStrategy: 'oidc' }),
    UserModule,
  ],
})
export class AuthModule {}
