import ICreatePersonCompanyDTO from '../dtos/ICreatePersonCompanyDTO';
import PersonCompany from '../infra/typeorm/entities/PersonCompany';

export default interface IPersonCompany {
  findAll(): Promise<PersonCompany[]>;
  findById(id: string): Promise<PersonCompany | undefined>;
  findByPerson(id: string): Promise<PersonCompany[]>;
  findByCompany(id: string): Promise<PersonCompany[]>;
  create(data: ICreatePersonCompanyDTO): Promise<PersonCompany>;
  update(entity: PersonCompany): Promise<PersonCompany>;
  delete(entity: PersonCompany): Promise<void>;
}
