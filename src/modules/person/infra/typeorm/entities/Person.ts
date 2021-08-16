import Role from '@modules/role/infra/typeorm/entities/Role';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
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

  @ManyToOne(() => Role, {
    eager: true,
  })
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @Column('varchar')
  role_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Person;
