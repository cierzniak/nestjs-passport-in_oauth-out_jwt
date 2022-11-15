import type { ConfigType } from './config.type';

export default (): ConfigType => ({
  server: {
    debug: true,
    port: 3000,
  },
  oauth2: {
    url: {
      authorization:
        'http://localhost:8080/realms/my-app/protocol/openid-connect/auth',
      token:
        'http://localhost:8080/realms/my-app/protocol/openid-connect/token',
      redirect: 'http://localhost:3000/_oauth/callback',
    },
    client: {
      id: 'nestjs',
      secret: 'O9Xfb2cpciI1tTgzpHWjWuA7tv3FJkWO',
    },
    scope: 'profile email',
  },
  jwt: {
    secret: 'NH)E%Y3pR?AsC6y8f`Q@(DI%Sc19=t}^8sPa=[Cc"UM1o{pcLScZ0P>.%X%w,<t',
    tokenAlive: '2h',
  },
});
