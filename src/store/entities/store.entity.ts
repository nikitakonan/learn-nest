import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Index,
  Unique,
  ManyToOne,
  ManyToMany,
  JoinColumn,
  JoinTable,
} from 'typeorm';
import { Tag } from './tag.entity';

@Entity()
@Unique(['id', 'slug'])
export class Store {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  @Index()
  slug: string;

  @Column()
  description: string;

  @CreateDateColumn()
  created: Date;

  @Column()
  address: string;

  @Column()
  photo: string;

  @ManyToMany(() => Tag, { cascade: true })
  @JoinTable()
  tags: Tag[];

  @ManyToOne(() => User)
  @JoinColumn({ name: 'author' })
  author: User;
}
