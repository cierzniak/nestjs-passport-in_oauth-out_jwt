export type ConfigType = {
  server: {
    debug: boolean;
    port: number;
  };
  oauth2: {
    url: {
      authorization: string;
      token: string;
      redirect: string;
    };
    client: {
      id: string;
      secret: string;
    };
    scope: string;
  };
  jwt: {
    secret: string;
    tokenAlive: string;
  };
};
