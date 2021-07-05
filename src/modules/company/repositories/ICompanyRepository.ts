import ICreateCompanyDTO from '../dtos/ICreateCompanyDTO';
import Company from '../infra/typeorm/entities/Company';

export default interface ICompanyRepository {
  findAll(): Promise<Company[]>;
  findById(id: string): Promise<Company | undefined>;
  findByCod(cod: string): Promise<Company | undefined>;
  create(data: ICreateCompanyDTO): Promise<Company>;
  update(company: Company): Promise<Company>;
  delete(company: Company): Promise<void>;
}
