import Product from '@modules/product/infra/typeorm/entities/Product';
import User from '@modules/user/infra/typeorm/entities/User';
import Storage from '@modules/storage/infra/typeorm/entities/Storage';

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('transaction')
class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  type: string;

  @Column('varchar')
  quantity: string;

  @Column()
  product_id: string;

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column()
  origin_id: string;

  @ManyToOne(() => Storage)
  @JoinColumn({ name: 'origin_id' })
  origin: Storage;

  @Column()
  destination_id: string;

  @ManyToOne(() => Storage)
  @JoinColumn({ name: 'destination_id' })
  destination: Storage;

  @Column()
  user_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Transaction;
