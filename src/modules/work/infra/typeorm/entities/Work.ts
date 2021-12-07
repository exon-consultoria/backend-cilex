import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('works')
class Work {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  code: string;

  @Column('varchar')
  color: string;

  @Column('varchar')
  description: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Work;
