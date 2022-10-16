import { Config } from './config.type';

export default (): Config => ({
  debug: false,
  secret: process.env.SECRET,
  port: 80,
  app: {
    defaultPageSize: parseInt(process.env.DEFAULT_PAGE_SIZE, 10) || 20,
  },
  database: {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10) || 3306,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_SCHEMA,
  },
  oidc: {
    providerUrl: process.env.OIDC_PROVIDER,
    clientId: process.env.OIDC_CLIENT_ID,
    clientSecret: process.env.OIDC_CLIENT_SECRET,
    scope: process.env.OIDC_SCOPE,
    redirectUrl: process.env.OIDC_REDIRECT_URI,
    logoutRedirectUrl: process.env.OIDC_LOGOUT_REDIRECT_URI,
  },
});
