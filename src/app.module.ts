import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PublicModule } from './public/public.module';
import { AuthModule } from './auth/auth.module';
import devConfig from '../config/development';

@Module({
  imports: [
    ConfigModule.forRoot({ cache: true, load: [devConfig] }),
    PublicModule,
    AuthModule,
  ],
})
export class AppModule {}
