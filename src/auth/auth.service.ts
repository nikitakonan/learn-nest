import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RequestUser } from './entities/request-user';
import { RegisterUserDto } from './dto/register-user.dto';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  login(user: RequestUser) {
    const payload = { username: user.email, sub: user.id, name: user.name };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(user: RegisterUserDto) {
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(user.password, saltRounds);

    const userEntity = new User();
    userEntity.email = user.email;
    userEntity.name = user.name;
    userEntity.password = passwordHash;
    await this.userService.create(userEntity);
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<RequestUser | null> {
    const user = await this.userService.findByEmail(email);
    const passwordMatch = await this.passworMatch(password, user.password);
    if (passwordMatch) {
      return {
        id: user.id,
        name: user.name,
        email: user.email,
      };
    }
    return null;
  }

  async passworMatch(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }
}
