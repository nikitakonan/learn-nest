import { Store } from '../../store/entities/store.entity';
import { User } from '../../user/entities/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Review {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToMany(() => User)
  @JoinTable()
  author: User;

  @ManyToMany(() => Store)
  @JoinTable()
  store: Store;

  @Column()
  text: string;

  @Column()
  rating: number;

  @CreateDateColumn()
  created: Date;
}
