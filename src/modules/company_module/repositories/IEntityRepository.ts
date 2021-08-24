import ICreateEntityDTO from '../dtos/ICreateEntityDTO';
import CompanyModule from '../infra/typeorm/entities/CompanyModule';

export default interface IEntityRepository {
  findAll(): Promise<CompanyModule[]>;
  findById(id: string): Promise<CompanyModule | undefined>;
  findByCompany(id: string): Promise<CompanyModule[]>;
  findByModule(id: string): Promise<CompanyModule[]>;
  create(data: ICreateEntityDTO): Promise<CompanyModule>;
  update(entity: CompanyModule): Promise<CompanyModule>;
  delete(entity: CompanyModule): Promise<void>;
}
