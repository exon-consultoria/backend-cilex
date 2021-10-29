import ProductFamily from '@modules/product_family/infra/typeorm/entities/ProductFamily';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('product_subfamily')
class ProductSubFamily {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  code: string;

  @Column('varchar')
  description: string;

  @Column()
  product_family_id: string;

  @ManyToOne(() => ProductFamily)
  @JoinColumn({ name: 'product_family_id' })
  product_family: ProductFamily;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default ProductSubFamily;
