import ProductGroup from '@modules/product_group/infra/typeorm/entities/ProductGroup';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('product_subgroup')
class ProductSubGroup {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  code: string;

  @Column('varchar')
  description: string;

  @Column()
  product_group_id: string;

  @ManyToOne(() => ProductGroup)
  @JoinColumn({ name: 'product_group_id' })
  product_group: ProductGroup;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default ProductSubGroup;
