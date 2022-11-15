import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PublicModule } from './Public/public.module';
import devConfig from '../config/development';

@Module({
  imports: [
    ConfigModule.forRoot({ cache: true, load: [devConfig] }),
    PublicModule,
  ],
})
export class AppModule {}
