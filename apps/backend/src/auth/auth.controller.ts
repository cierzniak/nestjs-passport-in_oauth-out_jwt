import {
  Controller,
  Get,
  Request,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { LoginGuard } from './login.guard';

@Controller()
export class AuthController {
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

  @Get('/logout')
  logout(@Request() req, @Res() res: Response) {
    req.session.destroy(() =>
      res.redirect(process.env.OIDC_LOGOUT_REDIRECT_URI),
    );
  }
}
