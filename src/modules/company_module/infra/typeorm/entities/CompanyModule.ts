import Company from '@modules/company/infra/typeorm/entities/Company';
import Module from '@modules/module/infra/typeorm/entities/Module';
import { Exclude } from 'class-transformer';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('company_modules')
class CompanyModule {
  @Exclude()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Exclude()
  @Column()
  module_id: string;

  @ManyToOne(() => Module, { eager: true })
  @JoinColumn({ name: 'module_id' })
  module: Module;

  @Exclude()
  @Column()
  company_id: string;

  @Exclude()
  @ManyToOne(() => Company)
  @JoinColumn({ name: 'company_id' })
  company: Company;
}

export default CompanyModule;
