import ICreateCompanyDTO from '@modules/company/dtos/ICreateCompanyDTO';
import ICompanyRepository from '@modules/company/repositories/ICompanyRepository';
import { getRepository, Repository } from 'typeorm';
import Company from '../entities/Company';

class CompanyRepository implements ICompanyRepository {
  private ormRepository: Repository<Company>;

  constructor() {
    this.ormRepository = getRepository(Company);
  }

  public async findIsMatriz(): Promise<Company[]> {
    const result = await this.ormRepository.find({ where: { isMatriz: true } });

    return result;
  }

  public async findByMatriz(matriz_id: string): Promise<Company[]> {
    const result = await this.ormRepository.find({ where: { matriz_id } });

    return result;
  }

  public async findAll(): Promise<Company[]> {
    const result = await this.ormRepository.find();

    return result;
  }

  public async findById(id: string): Promise<Company | undefined> {
    const result = await this.ormRepository.findOne(id);

    return result;
  }

  public async findByCode(code: string): Promise<Company | undefined> {
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
    matriz_id,
    isMatriz,
  }: ICreateCompanyDTO): Promise<Company> {
    const result = this.ormRepository.create({
      cnpj,
      code,
      cep,
      email,
      endereco,
      matriz_id,
      nome_fantasia,
      razao_social,
      uf,
      tel,
      info,
      isMatriz,
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
