import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { Oauth2Strategy } from './oauth2.strategy';

@Module({
  controllers: [AuthController],
  providers: [Oauth2Strategy],
  imports: [ConfigModule, PassportModule],
})
export class AuthModule {}
