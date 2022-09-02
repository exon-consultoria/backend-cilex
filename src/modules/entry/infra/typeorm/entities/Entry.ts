import Income from '@modules/income/infra/typeorm/entities/Income';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity('entry')
class Entry {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  date_income: string;

  @Column('varchar')
  type: string;

  @Column('varchar')
  financial_entity: string;

  @Column('varchar')
  chart_of_accounts: string;

  @Column('varchar')
  description: string;

  @Column('decimal')
  value: number;

  @Column('varchar')
  date_to_pay: string;

  @Column('decimal')
  value_payed: number;

  @Column('varchar')
  date_payed: string;

  @Column('varchar')
  title_status: string;

  @Column('varchar')
  payed_status: string;

  @Column('decimal')
  cash_flow: number;

  @OneToOne(() => Income, { eager: true })
  @JoinColumn({ name: 'income_id' })
  income: Income;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Entry;
