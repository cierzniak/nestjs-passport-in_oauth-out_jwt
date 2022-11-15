import { Controller, Get, Request, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { Oauth2Guard } from './oauth2.guard';

@Controller()
export class AuthController {
  @UseGuards(Oauth2Guard)
  @Get('_oauth/callback')
  loginCallback(@Request() req, @Res() res: Response) {
    return res.status(200).json({ user: req.user });
  }

  @UseGuards(Oauth2Guard)
  @Get('login')
  login() {
    return;
  }
}
