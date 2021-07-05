import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('people')
class Person {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  code: string;

  @Column('varchar')
  cpf: string;

  @Column('varchar')
  cnpj: string;

  @Column('varchar')
  razao_social: string;

  @Column('varchar')
  nome: string;

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

  @Column('varchar')
  info: string;

  @Column('boolean')
  isUser: boolean;

  @Column('varchar')
  tipo: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Person;
