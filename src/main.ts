import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

(async () => {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  const configService = app.get<ConfigService>(ConfigService);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: false },
      whitelist: true,
    }),
  );

  const serverPort = configService.get<number>('server.port');
  await app.listen(serverPort);
  Logger.debug(`🚀 API has started on http://localhost:${serverPort}/`);
})();
