import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('income')
class Income {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 4 })
  code: string;

  @Column('varchar')
  account: string;

  @Column('varchar')
  type: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Income;
