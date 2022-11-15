import { Controller, Get } from '@nestjs/common';

@Controller()
export class PublicController {
  @Get()
  get() {
    return {
      data: {
        ping: 'pong',
      },
    };
  }
}
