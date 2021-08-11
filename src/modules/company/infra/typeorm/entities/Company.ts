import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

@Entity('companies')
class Company {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  code: string;

  @Column('varchar')
  cnpj: string;

  @Column('varchar')
  razao_social: string;

  @Column('varchar')
  nome_fantasia: string;

  @Column('varchar')
  email: string;

  @Column('varchar')
  tel: string;

  @Column('varchar')
  cep: string;

  @Column('varchar')
  endereco: string;

  @Column('varchar')
  uf: string;

  @Column('boolean')
  isMatriz: boolean;

  @Column('varchar')
  matriz_id: string;

  @ManyToOne(() => Company)
  @JoinColumn({ name: 'matriz_id' })
  matriz: Company;

  @Column('varchar')
  info: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Company;
