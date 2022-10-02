import Enclosure from '@modules/enclosure/infra/typeorm/entities/Enclosure';
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

@Entity('pet')
class Pet {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  name: string;

  @Column('varchar')
  picture: string;

  @Column('varchar')
  breed: string;

  @Column('date')
  born_at: string;

  @Column()
  gender: string;

  @Column('boolean')
  sociable: boolean;

  @Column('boolean')
  castrated: boolean;

  @Column('varchar')
  size: string;

  @Column()
  items: string;

  @Column()
  enclosure_id: string;

  @ManyToOne(() => Enclosure)
  @JoinColumn({ name: 'enclosure_id' })
  enclosure: Enclosure;

  @Column()
  owner_id: string;

  @ManyToOne(() => Person)
  @JoinColumn({ name: 'owner_id' })
  owner: Person;

  @Column()
  note: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Pet;
