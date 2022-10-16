import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import * as session from 'express-session';
import * as passport from 'passport';
import { AppModule } from './app.module';
import { DomainExceptionFilter } from './common/domain.exception.filter';
import * as createRedisStore from 'connect-redis';
import { createClient as createRedisClient } from 'redis';

const RedisStore = createRedisStore(session);

(async () => {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  const redisClient = createRedisClient({
    socket: {
      host: configService.get('redis.host'),
      port: configService.get('redis.port'),
    },
    username: configService.get('redis.username'),
    password: configService.get('redis.password'),
    legacyMode: true,
  });
  await redisClient.connect();

  app.use(
    session({
      secret: configService.get('secret'),
      name: 'example_session',
      cookie: {
        maxAge: 900000,
        httpOnly: true,
        sameSite: 'lax',
        secure: !configService.get('debug'),
      },
      store: new RedisStore({
        client: redisClient as any,
        prefix: 'session_',
        ttl: 86400,
      }),
      resave: false,
      rolling: true,
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
