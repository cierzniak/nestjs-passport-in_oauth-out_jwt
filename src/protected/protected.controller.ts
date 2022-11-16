import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/jwt.guard';

@UseGuards(JwtGuard)
@Controller('/protect')
export class ProtectedController {
  @Get()
  get() {
    return {
      data: {
        ping: 'pong',
      },
    };
  }
}
