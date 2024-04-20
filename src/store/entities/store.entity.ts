import { User } from '../../user/entities/user.entity';
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
import { Location } from './Location';

@Entity()
@Unique(['id', 'slug'])
export class Store {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  @Index()
  slug: string;

  @Column()
  description: string;

  @CreateDateColumn()
  created: Date;

  @Column({ nullable: true })
  photo?: string;

  @ManyToMany(() => Tag, { cascade: true })
  @JoinTable()
  tags: Tag[];

  @ManyToOne(() => User)
  @JoinColumn({ name: 'author' })
  author: User;

  @Column(() => Location, { prefix: false })
  location: Location;
}
