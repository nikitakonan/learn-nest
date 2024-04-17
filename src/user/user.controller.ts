import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Request } from 'express';
import { User } from './entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('account')
  @UseGuards(JwtAuthGuard)
  account(@Req() req: Request) {
    const user = req.user as User;
    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }
}
