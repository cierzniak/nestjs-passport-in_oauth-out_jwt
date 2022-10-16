import { Config } from './config.type';

export default (): Config => ({
  debug: true,
  secret: 'P1PuxSMrb2LUctEbrDff5IeQqrzsaJs2CwgOSdKNtI',
  port: 8000,
  app: {
    defaultPageSize: 20,
  },
  database: {
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'secret',
    database: 'example',
  },
  redis: {
    host: 'localhost',
    port: 6379,
    username: 'default',
    password: 'secret',
  },
  oidc: {
    providerUrl: 'http://localhost:9091',
    clientId: '8d5ac03e-c9a7-48f3-b03b-2890c64811f1',
    clientSecret: 'i8saBrz5xx5QCuPADUpDJ165CPfAPZTxWtjOBjNDDu',
    scope: 'openid email profile',
    redirectUrl: 'http://localhost:8000/_auth/callback',
    logoutRedirectUrl: 'http://localhost:3000',
  },
});
