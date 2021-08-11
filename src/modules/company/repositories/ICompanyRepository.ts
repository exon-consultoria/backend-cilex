import ICreateCompanyDTO from '../dtos/ICreateCompanyDTO';
import Company from '../infra/typeorm/entities/Company';

export default interface ICompanyRepository {
  findAll(): Promise<Company[]>;
  findById(id: string): Promise<Company | undefined>;
  findByCode(code: string): Promise<Company | undefined>;
  findByMatriz(matriz_id: string): Promise<Company[]>;
  findIsMatriz(): Promise<Company[]>;
  create(data: ICreateCompanyDTO): Promise<Company>;
  update(company: Company): Promise<Company>;
  delete(company: Company): Promise<void>;
}
