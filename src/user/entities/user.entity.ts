import { Store } from 'src/store/entities/store.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true, select: false })
  password: string;

  @Column()
  name: string;

  @Column({ nullable: true, select: false })
  resetPasswordToken?: string;

  @Column({ nullable: true, select: false })
  resetPasswordExpires?: Date;

  hearts: Store[];
}
