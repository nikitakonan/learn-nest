import { Column } from 'typeorm';

export class Location {
  @Column({ nullable: true })
  address: string;

  @Column('point', { nullable: true })
  coordinates: string;
}
