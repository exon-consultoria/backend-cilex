import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('enclosures')
class Enclosure {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  code: string;

  @Column('varchar')
  description: string;

  @Column('varchar', { nullable: true })
  enclosure_size_big: string;

  @Column('varchar', { nullable: true })
  enclosure_size_big_available: string;

  @Column('varchar', { nullable: true })
  enclosure_size_medium: string;

  @Column('varchar', { nullable: true })
  enclosure_size_medium_available: string;

  @Column('varchar', { nullable: true })
  enclosure_size_small: string;

  @Column('varchar', { nullable: true })
  enclosure_size_small_available: string;

  @Column('varchar')
  size: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Enclosure;
