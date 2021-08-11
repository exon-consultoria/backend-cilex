import ICreatePersonDTO from '@modules/person/dtos/ICreatePersonDTO';
import IPersonRepository from '@modules/person/repositories/IPersonRepository';
import { getRepository, Repository } from 'typeorm';
import Person from '../entities/Person';

class CompanyRepository implements IPersonRepository {
  private ormRepository: Repository<Person>;

  constructor() {
    this.ormRepository = getRepository(Person);
  }

  public async findAll(): Promise<Person[]> {
    const result = await this.ormRepository.find();

    return result;
  }

  public async findById(id: string): Promise<Person | undefined> {
    const result = await this.ormRepository.findOne(id);

    return result;
  }

  public async findByCode(code: string): Promise<Person | undefined> {
    const result = await this.ormRepository.findOne({ where: { code } });

    return result;
  }

  public async create({
    code,
    cnpj,
    razao_social,
    nome_fantasia,
    email,
    tel,
    endereco,
    cep,
    uf,
    info,
    isUser,
    cpf,
    nome,
    tipo,
    role_id,
  }: ICreatePersonDTO): Promise<Person> {
    const result = this.ormRepository.create({
      code,
      cnpj,
      razao_social,
      nome_fantasia,
      email,
      tel,
      endereco,
      cep,
      uf,
      info,
      isUser,
      cpf,
      nome,
      tipo,
      role_id,
    });

    await this.ormRepository.save(result);

    return result;
  }

  public async update(entity: Person): Promise<Person> {
    return this.ormRepository.save(entity);
  }

  public async delete(entity: Person): Promise<void> {
    await this.ormRepository.remove(entity);
  }
}

export default CompanyRepository;
