import Entry from '@modules/entry/infra/typeorm/entities/Entry';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
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

  @OneToOne(() => Entry, () => Income)
  entry: Entry;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Income;
