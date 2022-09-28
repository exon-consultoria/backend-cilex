import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

interface IEnclosureSizeProps {
  size: '';
  capacity: '';
}

@Entity('enclosures')
class Enclosure {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  code: string;

  @Column('varchar')
  description: string;

  @Column('json', {
    array: true,
    default: [{ size: '', capacity: '', available: '' }],
  })
  enclosure_size: IEnclosureSizeProps[];

  @Column('varchar')
  size: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Enclosure;
