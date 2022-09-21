import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('enclosure_size')
class EnclosureSize {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  size: string;

  @Column('int')
  capacity: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default EnclosureSize;
