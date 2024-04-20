import { Store } from '../../store/entities/store.entity';
import { User } from '../../user/entities/user.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Review {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'author' })
  author: User;

  @ManyToOne(() => Store)
  @JoinColumn({ name: 'store' })
  store: Store;

  @Column()
  text: string;

  @Column()
  rating: number;

  @CreateDateColumn()
  created: Date;
}
