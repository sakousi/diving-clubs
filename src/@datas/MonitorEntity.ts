import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToOne } from 'typeorm';
import { PersonEntity } from './PersonEntity';
import { Identifier } from 'src/@models/Identifier';

@Entity()
export class MonitorEntity implements Identifier {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  grade: string;
  @OneToOne((type) => PersonEntity, (person) => person.monitor)
  person: PersonEntity
}
