import Company from '@modules/company/infra/typeorm/entities/Company';
import Module from '@modules/module/infra/typeorm/entities/Module';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('company_modules')
class CompanyModule {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  module_id: string;

  @ManyToOne(() => Module, { eager: true })
  @JoinColumn({ name: 'module_id' })
  module: Module;

  @Column()
  company_id: string;

  @ManyToOne(() => Company)
  @JoinColumn({ name: 'company_id' })
  company: Company;
}

export default CompanyModule;
