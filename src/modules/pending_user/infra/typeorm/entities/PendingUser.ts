import Person from '@modules/person/infra/typeorm/entities/Person';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('pending_users')
class PendingUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Person, {
    eager: true,
  })
  @JoinColumn({ name: 'person_id' })
  person: Person;

  @Column('varchar')
  person_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default PendingUser;
