import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('product_um')
class ProductUM {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  code: string;

  @Column('varchar')
  description: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default ProductUM;
