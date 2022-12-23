import { AuthService } from './auth.service';
import { Controller, Post, Get, Body, UseGuards, Req } from '@nestjs/common';
import { RegisterDTO } from './dto';
import { Request } from 'express';
import { LocalAuthGuard } from './passport/local-auth.guard';
import CryptoJS from 'crypto-js';
import { Public } from './passport/public';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('register')
  async register(@Body() registerDTO: RegisterDTO) {
    const user = await this.authService.register(registerDTO);
    const userObj = await this.authService.sendUserWithToken(user);

    return userObj;
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: Request) {
    const user = await this.authService.sendUserWithToken(req.user);
    return user;
  }
}
