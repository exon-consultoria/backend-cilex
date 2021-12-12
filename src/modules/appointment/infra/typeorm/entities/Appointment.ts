import Person from '@modules/person/infra/typeorm/entities/Person';
import Pet from '@modules/pet/infra/typeorm/entities/Pet';
import Work from '@modules/work/infra/typeorm/entities/Work';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('appointments')
class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  recurrence: string;

  @Column('date')
  date: string;

  @Column('boolean')
  done: boolean;

  @Column()
  work_id: string;

  @ManyToOne(() => Work, { eager: true })
  @JoinColumn({ name: 'work_id' })
  work: Work;

  @Column()
  pet_id: string;

  @ManyToOne(() => Pet, { eager: true })
  @JoinColumn({ name: 'pet_id' })
  pet: Pet;

  @Column()
  owner_id: string;

  @ManyToOne(() => Person, { eager: true })
  @JoinColumn({ name: 'owner_id' })
  owner: Person;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Appointment;
