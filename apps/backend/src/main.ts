import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import * as session from 'express-session';
import * as passport from 'passport';
import { AppModule } from './app.module';
import { DomainExceptionFilter } from './common/domain.exception.filter';

(async () => {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  app.use(
    session({
      secret: configService.get('secret'),
      resave: false,
      saveUninitialized: false,
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
      whitelist: true,
    }),
  );

  app.useGlobalFilters(new DomainExceptionFilter());

  await app.listen(configService.get('port'));
})();
