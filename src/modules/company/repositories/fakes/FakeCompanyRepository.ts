import ICreateCompanyDTO from '@modules/company/dtos/ICreateCompanyDTO';
import Company from '@modules/company/infra/typeorm/entities/Company';
import { v4 as uuid } from 'uuid';
import ICompanyRepository from '../ICompanyRepository';

class FakeCompanyRepository implements ICompanyRepository {
  findIsMatriz(): Promise<Company[]> {
    throw new Error('Method not implemented.');
  }

  private items: Company[] = [];

  findByMatriz(matriz_id: string): Promise<Company[]> {
    throw new Error('Method not implemented.');
  }

  public async findAll(): Promise<Company[]> {
    return this.items;
  }

  public async findById(id: string): Promise<Company | undefined> {
    const result = this.items.find(item => item.id === id);

    return result;
  }

  public async findByCode(code: string): Promise<Company | undefined> {
    const result = this.items.find(item => item.code === code);

    return result;
  }

  public async create(userData: ICreateCompanyDTO): Promise<Company> {
    const item = new Company();

    Object.assign(item, { id: uuid() }, userData);

    this.items.push(item);

    return item;
  }

  public async update(company: Company): Promise<Company> {
    const findIndex = this.items.findIndex(
      findUser => findUser.id === company.id,
    );

    this.items[findIndex] = company;

    return company;
  }

  public async delete(company: Company): Promise<void> {
    const index = this.items.findIndex(item => item.id === company.id);

    this.items.splice(index, 1);
  }
}

export default FakeCompanyRepository;
