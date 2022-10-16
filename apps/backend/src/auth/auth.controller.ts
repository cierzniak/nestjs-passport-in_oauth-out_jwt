import {
  Controller,
  Delete,
  Get,
  Request,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { LoginGuard } from './login.guard';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AuthController {
  constructor(private readonly configService: ConfigService) {}

  @UseGuards(LoginGuard)
  @Get('/_auth/callback')
  loginCallback(@Res() res: Response) {
    // TODO redirect to caller (frontend)
    res.redirect('/user');
  }

  @UseGuards(LoginGuard)
  @Get('/login')
  login() {
    return;
  }

  @Get('/user')
  user(@Request() req) {
    if (!req.user) {
      throw new UnauthorizedException();
    }
    return req.user;
  }

  @Delete('/logout')
  logout(@Request() req, @Res() res: Response) {
    req.session.destroy(() =>
      res.redirect(this.configService.get('oidc.logoutRedirectUrl')),
    );
  }
}
