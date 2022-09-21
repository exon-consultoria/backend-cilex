import EnclosureSize from '@modules/enclosure_size/infra/typeorm/entities/EnclosureSize';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('enclosures')
class Enclosure {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  code: string;

  @Column('varchar')
  description: string;

  @Column()
  enclosure_size_id: string;

  @ManyToOne(() => EnclosureSize)
  @JoinColumn({ name: 'enclosure_size_id' })
  enclosure_size: EnclosureSize;

  @Column('varchar')
  size: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Enclosure;
