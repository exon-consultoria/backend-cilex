import ProductApplication from '@modules/product_application/infra/typeorm/entities/ProductApplication';
import ProductDimension from '@modules/product_dimension/infra/typeorm/entities/ProductDimension';
import ProductFamily from '@modules/product_family/infra/typeorm/entities/ProductFamily';
import ProductGroup from '@modules/product_group/infra/typeorm/entities/ProductGroup';
import ProductSubFamily from '@modules/product_subfamily/infra/typeorm/entities/ProductSubFamily';
import ProductSubGroup from '@modules/product_subgroup/infra/typeorm/entities/ProductSubGroup';
import ProductType from '@modules/product_type/infra/typeorm/entities/ProductType';
import ProductUM from '@modules/product_um/infra/typeorm/entities/ProductUM';
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

@Entity('product')
class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  code: string;

  @Column('varchar')
  description: string;

  @Column('varchar')
  technical_description: string;

  @Column('varchar')
  picture: string;

  @Column('varchar')
  technical_picture: string;

  @Column()
  group_id: string;

  @ManyToOne(() => ProductGroup)
  @JoinColumn({ name: 'group_id' })
  group: ProductGroup;

  @Column()
  standard_storage: string;

  @ManyToOne(() => Storage)
  @JoinColumn({ name: 'standard_storage' })
  storage: Storage;

  @Column()
  type_id: string;

  @ManyToOne(() => ProductType)
  @JoinColumn({ name: 'type_id' })
  type: ProductType;

  @Column()
  subgroup_id: string;

  @ManyToOne(() => ProductSubGroup)
  @JoinColumn({ name: 'subgroup_id' })
  subgroup: ProductSubGroup;

  @Column()
  subfamily_id: string;

  @ManyToOne(() => ProductSubFamily)
  @JoinColumn({ name: 'subfamily_id' })
  subfamily: ProductSubFamily;

  @Column()
  family_id: string;

  @ManyToOne(() => ProductFamily)
  @JoinColumn({ name: 'family_id' })
  family: ProductFamily;

  @Column()
  umu_id: string;

  @ManyToOne(() => ProductUM)
  @JoinColumn({ name: 'umu_id' })
  umu: ProductUM;

  @Column()
  umc_id: string;

  @ManyToOne(() => ProductUM)
  @JoinColumn({ name: 'umc_id' })
  umc: ProductUM;

  @Column()
  application_id: string;

  @ManyToOne(() => ProductApplication)
  @JoinColumn({ name: 'application_id' })
  application: ProductApplication;

  @Column()
  dimensions_id: string;

  @ManyToOne(() => ProductDimension)
  @JoinColumn({ name: 'dimensions_id' })
  dimensions: ProductDimension;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Product;
