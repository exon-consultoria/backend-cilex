import ICreateCompanyDTO from '@modules/company/dtos/ICreateCompanyDTO';
import ICompanyRepository from '@modules/company/repositories/ICompanyRepository';
import { getRepository, Repository } from 'typeorm';
import Company from '../entities/Company';

class CompanyRepository implements ICompanyRepository {
  private ormRepository: Repository<Company>;

  constructor() {
    this.ormRepository = getRepository(Company);
  }

  public async findAll(): Promise<Company[]> {
    const result = await this.ormRepository.find();

    return result;
  }

  public async findById(id: string): Promise<Company | undefined> {
    const result = await this.ormRepository.findOne(id);

    return result;
  }

  public async findByCod(cod: string): Promise<Company | undefined> {
    const result = await this.ormRepository.findOne({ where: { cod } });

    return result;
  }

  public async create({
    cod,
    cnpj,
    razao_social,
    nome_fantasia,
    email,
    tel,
    endereco,
    cep,
    uf,
    info,
    matriz,
  }: ICreateCompanyDTO): Promise<Company> {
    const result = this.ormRepository.create({
      cnpj,
      cod,
      cep,
      email,
      endereco,
      matriz_id: matriz,
      nome_fantasia,
      razao_social,
      uf,
      tel,
      info,
    });

    await this.ormRepository.save(result);

    return result;
  }

  public async update(company: Company): Promise<Company> {
    return this.ormRepository.save(company);
  }

  public async delete(company: Company): Promise<void> {
    await this.ormRepository.remove(company);
  }
}

export default CompanyRepository;
