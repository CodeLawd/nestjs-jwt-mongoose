import { AuthService } from './auth.service';
import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { RegisterDTO } from './dto';
import { Request } from 'express';
import { LocalAuthGuard } from './passport/local-auth.guard';
import { Public } from './passport/public';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('register')
  async register(@Body() registerDTO: RegisterDTO) {
    const user = await this.authService.register(registerDTO);
    return await this.authService.sendUserWithToken(user);
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: Request) {
    return await this.authService.sendUserWithToken(req.user);
  }
}
