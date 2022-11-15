import type { ConfigType } from './config.type';

export default (): ConfigType => ({
  server: {
    debug: true,
    port: 3000,
  },
});
