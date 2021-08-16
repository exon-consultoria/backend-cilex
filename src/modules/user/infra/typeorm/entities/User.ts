import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Exclude } from 'class-transformer';
import Person from '@modules/person/infra/typeorm/entities/Person';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  name: string;

  @Column('varchar')
  email: string;

  @Column('boolean')
  isAdmin: boolean;

  @Column('boolean')
  isActive: boolean;

  @ManyToOne(() => Person, {
    eager: true,
  })
  @JoinColumn({ name: 'person_id' })
  person: Person;

  @Column('varchar')
  person_id: string;

  @Column('varchar')
  @Exclude()
  password: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column('timestamp with time zone')
  last_login: Date;
}

export default User;
