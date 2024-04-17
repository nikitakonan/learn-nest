import { User } from 'src/user/entities/user.entity';

export type RegisterUserDto = Pick<User, 'name' | 'email' | 'password'>;
