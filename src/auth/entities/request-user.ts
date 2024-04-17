import { User } from 'src/user/entities/user.entity';

export type RequestUser = Pick<User, 'id' | 'email' | 'name'>;
