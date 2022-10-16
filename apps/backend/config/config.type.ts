export interface Config {
  debug: boolean;
  secret: string;
  port: number;
  app: {
    defaultPageSize: number;
  };
  database: {
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
  };
  redis: {
    host: string;
    port: number;
    username: string;
    password: string;
  };
  oidc: {
    providerUrl: string;
    clientId: string;
    clientSecret: string;
    scope: string;
    redirectUrl: string;
    logoutRedirectUrl: string;
  };
}
