import { Store } from 'src/store/entities/store.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  name: string;

  @Column()
  resetPasswordToken?: string;

  @Column()
  resetPasswordExpires?: Date;

  hearts: Store[];
}
