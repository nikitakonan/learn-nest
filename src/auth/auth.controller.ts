import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { Request } from 'express';
import { RequestUser } from './entities/request-user';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Req() req: Request) {
    return this.authService.login(req.user as RequestUser);
  }

  @Post('register')
  // TODO Validation
  async register(@Body() user: RegisterUserDto) {
    this.authService.register(user);
  }
}
